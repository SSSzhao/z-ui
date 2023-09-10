import { defineComponent as p, toRefs as r, createVNode as i } from 'vue'
const f = {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    block: {
      type: Boolean,
      default: !1
    },
    tag: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: !1
    },
    attrType: {
      type: String,
      default: 'button'
    },
    // just for jsx
    onClick: {
      type: [Function, Array]
    }
  },
  n = /* @__PURE__ */ p({
    name: 'ZButton',
    props: f,
    setup(t, { slots: e }) {
      const { type: o, size: a, disabled: l, block: u } = r(t)
      return () => {
        const d = e.default ? e.default() : '按钮',
          s = u.value ? 'z-btn--block' : ''
        return i(
          'button',
          {
            disabled: l.value,
            class: `z-btn z-btn--${o.value} z-btn--${a.value} ${s}`
          },
          [d]
        )
      }
    }
  }),
  c = {
    install(t) {
      t.component(n.name, n)
    }
  }
export { n as Button, c as default }
