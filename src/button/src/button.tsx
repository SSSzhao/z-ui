import { defineComponent, toRefs } from 'vue'
import { ButtonProps, buttonProps } from './button-type'
export default defineComponent({
  name: 'ZButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type, size, disabled, block } = toRefs(props)

    return () => {
      const defaultSlot = slots.default ? slots.default() : '按钮'
      // block
      const blockCls = block.value ? 'z-btn--block' : ''
      return (
        <button
          disabled={disabled.value}
          class={`z-btn z-btn--${type.value} z-btn--${size.value} ${blockCls}`}
        >
          {defaultSlot}
        </button>
      )
    }
  }
})
