const axios = require('axios');

exports.handler = async (event) => {
  try {
    if (!event) {
      throw new Error('Event object is falsy');
    }
    const { model, message, max_completion_tokens } = event;
    
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages: [{ role: 'user', content: `${message}` }],
      max_completion_tokens: max_completion_tokens || null,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // return {
    //   statusCode: 200,
    //   body: response.data,
    // };
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};

// exports.handler = async (event) => {
//   try {
//     console.log('Received event:', JSON.stringify(event, null, 2));
    
//     // With proxy: false, the transformed body comes directly as event
//     const body = event;
    
//     console.log('Transformed body:', body);
    
//     // Access the transformed properties
//     const model = body.model;
//     const message = body.message;
//     const maxCompletionTokens = body.max_completion_tokens;
    
//     // For testing, just return the transformed data
//     return {
//       statusCode: 200,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         transformedData: {
//           model,
//           message,
//           maxCompletionTokens
//         },
//         originalEvent: event
//       })
//     };
//   } catch (error) {
//     console.error('Error:', error);
//     return {
//       statusCode: error.response?.status || 500,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ error: error.message })
//     };
//   }
// };
