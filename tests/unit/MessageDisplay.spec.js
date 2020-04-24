import MessageDisplay from '@/components/MessageDisplay'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises'

import { mount } from '@vue/test-utils'

jest.mock('@/services/axios')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('MessageDisplay.vue', () => {
  it('Calls getMessage and display message', async () => {
    const mockedMessage = 'Hello from the db!'
    getMessage.mockResolvedValueOnce({ text: mockedMessage })
    const wrapper = mount(MessageDisplay)
    await flushPromises()
    expect(getMessage).toHaveBeenCalledTimes(1)
    const message = wrapper.find('[data-testid="message"]').element.textContent
    expect(message).toBe(mockedMessage)
  })

  it('Displays an error when getMessage call fails', async () => {
    const mockError = 'Oops! Something went wrong.'
    getMessage.mockRejectedValueOnce(mockError)

    const wrapper = mount(MessageDisplay)

    await flushPromises()

    expect(getMessage).toHaveBeenCalledTimes(1)
    const error = wrapper.find('[data-testid="message-error"]').element
      .textContent
    expect(error).toBe(mockError)
  })
})
