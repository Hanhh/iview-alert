import { defineComponent, toRefs, computed, ref, h } from "vue";
import Icon from '../Icon';
import PropTypes from "../../utils/vue-types";
import { tuple, withInstall } from "../../utils/type";

const AlertProps = {
  type: PropTypes.oneOf(tuple("success", "info", "warning", "error")),
  closable: PropTypes.looseBool,
  showIcon: PropTypes.looseBool,
  banner: PropTypes.looseBool
};

const Alert = defineComponent({
  name: "Alert",
  inheritAttrs: false,
  props: AlertProps,
  emits: ["close"],
  setup(props, { emit, slots }) {
    const { type, showIcon, banner, closable } = toRefs(props);
    const prefixCls = "ivu-alert";
    const messageClasses = `${prefixCls}-message`;
    const descClasses = `${prefixCls}-desc`;
    const closeClasses = `${prefixCls}-close`;
    const iconClasses = `${prefixCls}-icon`;
    const closed = ref(false);
    const desc = ref(false);        
    
    const wrapClasses = computed(() => {
      return [
        `${prefixCls}`,
        `${prefixCls}-${type?.value}`,
        {
          [`${prefixCls}-with-icon`]: showIcon?.value,
          [`${prefixCls}-with-banner`]: banner?.value
        }
      ];
    });
    const iconType = computed(() => {
      let type = "";

      switch (type) {
        case "success":
          type = "ios-checkmark-circle";
          break;
        case "info":
          type = "ios-information-circle";
          break;
        case "warning":
          type = "ios-alert";
          break;
        case "error":
          type = "ios-close-circle";
          break;
      }

      if (desc) type += "-outline";
      return type;
    });
    const close = () => {
        closed.value = true;
        emit("close");
    };

    return {
      closed: false,
      desc: false,
      showIcon,
      close,
      iconType,
      wrapClasses,
      messageClasses,
      descClasses,
      closeClasses,
      iconClasses,
      closable
    };
  },
  render() {
    console.log(this);
    const { closed, desc, showIcon, iconType, wrapClasses, messageClasses, descClasses, closeClasses,  iconClasses, closable} = this;
    return closed ? null : (
      <transition>
        <div v-if={!closed} class={wrapClasses}>
        <span class={iconClasses} v-if={showIcon}>
            <slot name="icon">
                <Icon type={iconType}></Icon>
            </slot>
        </span>
        <span class={messageClasses}><slot></slot></span>
        <span class={descClasses}><slot name="desc"></slot></span>
        <a class={closeClasses} v-if={closable} nativeOn-click={close}>
            <slot name="close">
                <Icon type="ios-close"></Icon>
            </slot>
        </a>
        </div>
      </transition>

    );
    }
});

export default withInstall(Alert);
