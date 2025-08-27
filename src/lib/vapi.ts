import { VapiClient } from '@vapi-ai/server-sdk'

const vapi = new VapiClient({
  token: process.env.VAPI_API_KEY!,
})

export const asst = async () => {
  try {
    const assistant = await vapi.assistants.create({
      name: 'MeetingBot',
      firstMessage: 'Hi! Nice to meet you.How is your day? ',
      model: {
        provider: 'google',
        model: 'gemini-1.5-flash',
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content:
              'You are a friendly bot. you will answer only math question.',
          },
        ],
      },
      voice: {
        provider: '11labs',
        voiceId: '21m00Tcm4TlvDq8ikWAM',
      },
    })

    console.log('Assistant created:', assistant.id)
    return assistant
  } catch (error) {
    console.error('Error creating assistant:', error)
  }
}
