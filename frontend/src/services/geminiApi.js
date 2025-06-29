// API Key de Gemini
const GEMINI_API_KEY = 'AIzaSyCt9Rfq9t2a-qXYLgRLa5rlo-458_jCG_4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function getSmartRecommendations(weatherData) {
  try {
    console.log('Generando recomendaciones con Gemini...');
    
    const prompt = generateWeatherPrompt(weatherData);
    console.log('Prompt generado:', prompt);
    
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };
    
    console.log('Enviando request a Gemini:', requestBody);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Respuesta de Gemini:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en la API de Gemini:', response.status, errorText);
      throw new Error(`Error en la API de Gemini: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Datos de respuesta de Gemini:', data);
    
    const recommendation = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (recommendation) {
      console.log('Recomendación generada:', recommendation);
      return recommendation;
    } else {
      console.warn('No se encontró recomendación en la respuesta:', data);
      throw new Error('Formato de respuesta inesperado de Gemini');
    }
  } catch (error) {
    console.error('Error completo al obtener recomendaciones de Gemini:', error);
    throw error; // Propagar el error en lugar de usar fallback
  }
}

function generateWeatherPrompt(weatherData) {
  const current = weatherData?.current;
  const location = weatherData?.location;
  
  if (!current) {
    return 'Genera una recomendación general para actividades al aire libre.';
  }

  const weatherInfo = {
    temperatura: `${current.temp_c}°C`,
    sensacionTermica: `${current.feelslike_c}°C`,
    humedad: `${current.humidity}%`,
    viento: `${current.wind_kph} km/h`,
    direccionViento: current.wind_dir || 'No disponible',
    presion: `${current.pressure_mb} mb`,
    precipitacion: `${current.precip_mm} mm`,
    visibilidad: `${current.vis_km} km`,
    indiceUV: current.uv,
    nubosidad: `${current.cloud}%`,
    condicion: current.condition?.text || 'Despejado',
    puntoRocio: `${current.dewpoint_c}°C`,
    indiceCalor: `${current.heatindex_c}°C`,
    rafagas: `${current.gust_kph} km/h`,
    ciudad: location?.name || 'Tu ubicación',
    region: location?.region || '',
    pais: location?.country || ''
  };

  return `Eres un asistente experto en actividades al aire libre. Basándote en las condiciones meteorológicas actuales, genera recomendaciones breves y prácticas.

Condiciones en ${weatherInfo.ciudad}:
- Temperatura: ${weatherInfo.temperatura} (Sensación: ${weatherInfo.sensacionTermica})
- Condición: ${weatherInfo.condicion}
- Humedad: ${weatherInfo.humedad}
- Viento: ${weatherInfo.viento} km/h
- Índice UV: ${weatherInfo.indiceUV} ${getUVLevel(current.uv)}
- Precipitación: ${weatherInfo.precipitacion} mm

Genera 2-3 recomendaciones breves que incluyan:
1. Una actividad principal recomendada
2. Una precaución importante
3. El mejor horario del día

Responde en español de forma concisa, máximo 3 líneas por recomendación. Sé directo y práctico.`;
}

function getUVLevel(uv) {
  if (uv <= 2) return '(Bajo)';
  if (uv <= 5) return '(Moderado)';
  if (uv <= 7) return '(Alto)';
  if (uv <= 10) return '(Muy Alto)';
  return '(Extremo)';
} 