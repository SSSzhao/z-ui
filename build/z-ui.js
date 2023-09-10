import { defineComponent as r, toRefs as i, createVNode as p } from 'vue'
const c = {
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
  n = /* @__PURE__ */ r({
    name: 'ZButton',
    props: c,
    setup(t, { slots: e }) {
      const { type: o, size: l, disabled: a, block: u } = i(t)
      return () => {
        const s = e.default ? e.default() : '按钮',
          d = u.value ? 'z-btn--block' : ''
        return p(
          'button',
          {
            disabled: a.value,
            class: `z-btn z-btn--${o.value} z-btn--${l.value} ${d}`
          },
          [s]
        )
      }
    }
  }),
  f = {
    install(t) {
      t.component(n.name, n)
    }
  },
  b = [f],
  m = {
    install(t) {
      b.forEach(e => t.use(e))
    }
  }
export { n as Button, m as default }
