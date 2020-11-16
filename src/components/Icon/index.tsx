import {
  defineComponent,
  toRefs,
  computed,
} from 'vue';
import PropTypes from '../../utils/vue-types';
import { withInstall } from '../../utils/type';

const IconProps = {
  type: PropTypes.string,
  size: PropTypes.string || PropTypes.number,
  color: PropTypes.string,
  custom: PropTypes.string,
};

const Icon = defineComponent({
  name: 'Icon',
  inheritAttrs: false,
  props: IconProps,
  setup(props, { emit }) {
    const prefixCls = 'ivu-icon';
    const {
      type,
      custom,
      size,
      color,
    } = toRefs(props);
    const classes = computed(() => {
      const classArray = [
        `${prefixCls}`,
        {
          [`${prefixCls}-${type.value}`]: type.value !== '',
          [`${custom.value}`]: custom.value !== '',
        },
      ];
      return classArray;
    });
    const styles = computed(() => {
      const style: any = {};

      if (size.value) {
        style['font-size'] = `${size.value}px`;
      }

      if (color.value) {
        style.color = color.value;
      }

      return style;
    }) as any;
    const handleClick = (e: Event) => {
      emit('click', e);
    };
    const iconFragments = <i class={classes} style={styles} nativeOn-click={handleClick}></i>;
    return {
      classes,
      styles,
      handleClick,
      iconFragments,
    };
  },
  render() {
    const { iconFragments } = this;
    return iconFragments;
  },
});

export default withInstall(Icon);
