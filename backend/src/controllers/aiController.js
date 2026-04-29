const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

// Helper to check if we should use mock data (for demo purposes)
const useMock = () => !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here';

// @desc    Detect crop disease from image URL
// @route   POST /api/ai/disease-detection
// @access  Public
exports.detectDisease = async (req, res, next) => {
  try {
    const { imageUrl, cropName } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Please provide an image URL' });
    }

    if (useMock()) {
      return res.status(200).json({
        success: true,
        data: {
          disease: 'Late Blight (झुलसा रोग)',
          confidence: 0.92,
          treatment: 'Copper-based fungicides use karein. Affected leaves ko turant hata dein.',
          isMock: true
        }
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: `You are an expert agronomist. Identify any disease on this ${cropName || 'plant'} leaf. Respond in Hindi and English. Provide disease name and a short treatment.` },
            { type: 'image_url', image_url: { url: imageUrl } }
          ],
        },
      ],
      max_tokens: 300,
    });

    res.status(200).json({
      success: true,
      data: {
        analysis: response.choices[0].message.content,
        isMock: false
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Suggest price for a crop based on market data
// @route   POST /api/ai/price-suggestion
// @access  Public
exports.suggestPrice = async (req, res, next) => {
  try {
    const { cropName, quantity, location, quality } = req.body;

    if (!cropName || !location) {
      return res.status(400).json({ success: false, message: 'Please provide cropName and location' });
    }

    if (useMock()) {
      return res.status(200).json({
        success: true,
        data: {
          suggestedPrice: '₹35 - ₹42 per kg',
          marketTrend: 'UP',
          reasoning: 'Mausam ke karan tamatar ki aapurti kam hai. Pune mandi mein demand zyada hai.',
          isMock: true
        }
      });
    }

    const prompt = `You are an AI agricultural market analyst. A farmer from ${location} wants to sell ${quantity || 'some'} of ${quality || 'standard'} quality ${cropName}.
    Provide a realistic suggested price range in INR (₹).
    Keep the response concise, in Hindi, and explain the current market trend briefly.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7,
    });

    res.status(200).json({
      success: true,
      data: {
        suggestion: response.choices[0].message.content,
        isMock: false
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Hindi Chatbot Assistant for Farmers
// @route   POST /api/ai/chatbot
// @access  Public
exports.chatAssistant = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Please provide a message' });
    }

    if (useMock()) {
      return res.status(200).json({
        success: true,
        data: {
          reply: 'नमस्ते किसान भाई! मैं किसान सेतु का एआई सहायक हूँ। बारिश की सम्भावना के कारण, मैं आपको अपनी फसल जल्दी काटने की सलाह दूंगा। मैं आपकी और क्या मदद कर सकता हूँ?',
          isMock: true
        }
      });
    }

    const messages = [
      { role: 'system', content: 'You are a helpful, respectful, and expert agricultural assistant for Indian farmers named "KisanSetu Assistant". Always reply in simple Hindi. Give practical, easy-to-understand farming advice.' }
    ];

    if (history && Array.isArray(history)) {
      messages.push(...history);
    }
    
    messages.push({ role: 'user', content: message });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.6,
    });

    res.status(200).json({
      success: true,
      data: {
        reply: response.choices[0].message.content,
        isMock: false
      }
    });
  } catch (error) {
    next(error);
  }
};
