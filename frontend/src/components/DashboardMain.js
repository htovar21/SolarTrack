import React, { useEffect, useState, useCallback } from 'react';
import { getWeather } from '../services/api';
import { getSmartRecommendations } from '../services/geminiApi';
import WeatherCard from './WeatherCard';
import HourlyForecast from './HourlyForecast';
import WeatherDetails from './WeatherDetails';
import UvChart from './UvChart';
import './DashboardMain.css';

function DashboardMain() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [showCityInput, setShowCityInput] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);

  // Función para generar recomendaciones con Gemini
  const generateRecommendations = useCallback(async (weatherData) => {
    if (!weatherData) return;
    
    setRecommendationsLoading(true);
    try {
      const aiRecommendations = await getSmartRecommendations(weatherData);
      setRecommendations(aiRecommendations);
    } catch (error) {
      console.error('Error al generar recomendaciones:', error);
      setRecommendations('No se pudieron generar recomendaciones en este momento. Verifica tu conexión a internet o intenta más tarde.');
    } finally {
      setRecommendationsLoading(false);
    }
  }, []);

  // Función para cargar clima por ciudad
  const loadWeatherByCity = useCallback(async (cityName) => {
    try {
      setLoading(true);
      const weatherData = await getWeather(cityName);
      setWeather(weatherData);
      setCity(weatherData?.location?.name || cityName);
      localStorage.setItem('preferredCity', cityName);
      setLocationError(false);
      
      // Generar recomendaciones inteligentes
      await generateRecommendations(weatherData);
    } catch (err) {
      setLocationError(true);
    } finally {
      setLoading(false);
    }
  }, [generateRecommendations]);

  useEffect(() => {
    // Intentar obtener ubicación automáticamente
    const savedCity = localStorage.getItem('preferredCity');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const weatherData = await getWeather(`${latitude},${longitude}`);
          setWeather(weatherData);
          setCity(weatherData?.location?.name || '');
          localStorage.setItem('preferredCity', weatherData?.location?.name || '');
          setLocationError(false);
          
          // Generar recomendaciones inteligentes
          await generateRecommendations(weatherData);
        } catch (err) {
          // Si falla la geolocalización, usar ciudad guardada o por defecto
          const defaultCity = savedCity || 'Madrid';
          await loadWeatherByCity(defaultCity);
        }
        setLoading(false);
      }, (err) => {
        // Si no hay permisos de geolocalización, usar ciudad guardada o por defecto
        const defaultCity = savedCity || 'Madrid';
        loadWeatherByCity(defaultCity);
      }, { timeout: 10000 });
    } else {
      // Si no hay geolocalización, usar ciudad guardada o por defecto
      const defaultCity = savedCity || 'Madrid';
      loadWeatherByCity(defaultCity);
    }
  }, [loadWeatherByCity, generateRecommendations]);

  // Cuando el usuario cambia la ciudad
  const handleCitySubmit = async (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      await loadWeatherByCity(cityInput.trim());
      setCityInput('');
      setShowCityInput(false);
    }
  };

  const toggleCityInput = () => {
    setShowCityInput(!showCityInput);
    if (!showCityInput) {
      setCityInput(city);
    }
  };

  const refreshRecommendations = async () => {
    if (weather) {
      await generateRecommendations(weather);
    }
  };

  // Función para renderizar recomendaciones
  const renderRecommendations = (recs) => {
    if (typeof recs === 'string') {
      // Formatear el texto de Gemini para mejor legibilidad
      const formattedText = formatGeminiText(recs);
      return <div className="smart-recommendations-text" dangerouslySetInnerHTML={{ __html: formattedText }}></div>;
    }
    return <div className="smart-recommendations-text">{recs}</div>;
  };

  // Función para formatear el texto de Gemini
  const formatGeminiText = (text) => {
    if (!text) return '';
    
    return text
      .split('\n')
      .map((line, index) => {
        const trimmedLine = line.trim();
        
        if (!trimmedLine) {
          return '<div class="text-spacing"></div>';
        }
        
        if (trimmedLine.endsWith(':') && trimmedLine.length < 50) {
          return `<h4 class="recommendation-title">${trimmedLine}</h4>`;
        }
        
        if (/^[\d\-•]+\.?\s/.test(trimmedLine)) {
          return `<li class="recommendation-item">${trimmedLine.replace(/^[\d\-•]+\.?\s/, '')}</li>`;
        }
        
        const importantKeywords = ['importante', 'precaución', 'cuidado', 'evita', 'recomienda', 'sugiere'];
        const hasImportantKeyword = importantKeywords.some(keyword => 
          trimmedLine.toLowerCase().includes(keyword)
        );
        
        if (hasImportantKeyword) {
          return `<p class="recommendation-important">${trimmedLine}</p>`;
        }
        
        return `<p class="recommendation-paragraph">${trimmedLine}</p>`;
      })
      .join('')
      .replace(/(<li[^>]*>.*?<\/li>)+/g, (match) => `<ul class="recommendation-list">${match}</ul>`)
      .replace(/<h4[^>]*>([^<]+)<\/h4>/g, (match, content) => {
        if (content.toLowerCase().includes('actividad')) {
          return match.replace('<h4', '<h4 class="with-icon activity-icon"');
        } else if (content.toLowerCase().includes('precaución') || content.toLowerCase().includes('seguridad')) {
          return match.replace('<h4', '<h4 class="with-icon safety-icon"');
        } else if (content.toLowerCase().includes('horario') || content.toLowerCase().includes('tiempo')) {
          return match.replace('<h4', '<h4 class="with-icon time-icon"');
        } else if (content.toLowerCase().includes('alternativa')) {
          return match.replace('<h4', '<h4 class="with-icon alternative-icon"');
        }
        return match;
      });
  };

  if (loading) return <div className="loading-container">Cargando...</div>;

  return (
    <main className="dashboard-main">
      {/* Header con selector de ciudad */}
      <div className="dashboard-header">
        <div className="city-selector">
          <span className="current-city">{city || 'Cargando ubicación...'}</span>
          <button 
            className="change-city-btn" 
            onClick={toggleCityInput}
            title="Cambiar ciudad"
          >
            📍
          </button>
        </div>
        
        {showCityInput && (
          <form onSubmit={handleCitySubmit} className="city-input-form">
            <input 
              type="text" 
              value={cityInput} 
              onChange={e => setCityInput(e.target.value)} 
              placeholder="Introduce tu ciudad"
              required 
            />
            <button type="submit">Buscar</button>
            <button type="button" onClick={toggleCityInput}>Cancelar</button>
          </form>
        )}
      </div>
      
      {locationError && (
        <div className="location-error">
          No se pudo obtener el clima. Verifica el nombre de la ciudad.
        </div>
      )}
      
      {weather ? (
        <div className="dashboard-grid">
          {/* Columna izquierda - Clima y pronóstico */}
          <div className="dashboard-left-column">
            <WeatherCard
              city={weather?.location?.name || 'Ciudad'}
              temperature={weather?.current?.temp_c || '--'}
              uvIndex={weather?.current?.uv || '--'}
              uvLevel={weather?.current?.uv <= 2 ? 'UV Bajo' : weather?.current?.uv <= 5 ? 'UV Moderado' : 'UV Alto'}
              weatherData={weather}
            />
            <HourlyForecast hourlyData={weather?.forecast?.forecastday?.[0]?.hour || []} />
            <WeatherDetails weatherData={weather} />
          </div>
          
          {/* Columna derecha - Recomendaciones y resumen */}
          <div className="dashboard-right-column">
            {/* Recomendaciones Inteligentes */}
            <div className="recommendations-card">
              <div className="recommendations-header">
                <h3 className="recommendations-title">Recomendaciones Inteligentes</h3>
                <button 
                  className="refresh-recommendations-btn" 
                  onClick={refreshRecommendations}
                  disabled={recommendationsLoading}
                  title="Actualizar recomendaciones"
                >
                  🔄
                </button>
              </div>
              
              {recommendationsLoading ? (
                <div className="recommendations-loading">
                  <div className="loading-spinner"></div>
                  <p>Generando recomendaciones...</p>
                </div>
              ) : (
                recommendations ? renderRecommendations(recommendations) : (
                  <div className="smart-recommendations-text">Cargando recomendaciones...</div>
                )
              )}
            </div>
            
            {/* Gráfico UV */}
            <UvChart />
          </div>
        </div>
      ) : !loading && <div className="no-data">No hay datos de clima disponibles.</div>}
    </main>
  );
}

export default DashboardMain; 