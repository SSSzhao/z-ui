import { render } from '@testing-library/vue'
import Button from '../src/button'

// base功能
test('should work', () => {
  const { getByRole } = render(Button)

  getByRole('button')
})

test('slot should be 按钮', () => {
  const { getByText } = render(Button, {
    slots: {
      default() {
        return '按钮'
      }
    }
  })
  getByText('按钮')
})

test('default type should be primary', () => {
  const { getByRole } = render(Button)
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--primary')).toBe(true)
})

test('prop type should be secondary', () => {
  const { getByRole } = render(Button, {
    props: {
      type: 'secondary'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--secondary')).toBe(true)
})
