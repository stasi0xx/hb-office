import type OpenAI from 'openai';

export const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'search_menu',
      description:
        'Search the weekly menu for dishes matching customer preferences. ' +
        'Call this ONLY after asking the customer at least one preference question (e.g. meat/vege, category, taste). ' +
        'Do NOT call this on the very first message — ask first.',
      parameters: {
        type: 'object',
        properties: {
          preferences: {
            type: 'string',
            description:
              'Customer preferences described in natural language, e.g. "vegetarian", "hearty meat dish", "something light", "soup", "sushi".',
          },
          category: {
            type: 'string',
            description:
              'Optional: filter by exact category. One of: "Kanapki i wrapy", "Śniadania i owsianki", "Zupy", "Obiady", "Sałatki", "Sushi i poke", "Desery i napoje".',
          },
          date: {
            type: 'string',
            description: 'Optional: specific date in DD.MM.YYYY format.',
          },
        },
        required: ['preferences'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_delivery',
      description:
        'Check whether Głodny Niedźwiedź delivers to a specific city or location provided by the customer.',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description: 'City or location name to check, e.g. "Kraków", "Gdańsk", "Warsaw".',
          },
        },
        required: ['city'],
      },
    },
  },
];
