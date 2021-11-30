import React from 'react';

import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import MenuList from './MenuList';

import styles from './styles';
import { useInternal } from '../../hooks';
import {
  HOLD_ITEM_TRANSFORM_DURATION,
  CONTEXT_MENU_STATE,
  SPRING_CONFIGURATION,
} from '../../constants';

const MenuComponent = () => {
  const { state, menuProps } = useInternal();

  const insets = useSafeAreaInsets();

  const wrapperStyles = useAnimatedStyle(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];

    const top =
      anchorPositionVertical === 'top'
        ? menuProps.value.itemHeight + menuProps.value.itemY + insets.top
        : menuProps.value.itemY - insets.bottom;
    const left = menuProps.value.itemX;
    const width = menuProps.value.itemWidth;
    const tY = menuProps.value.transformValue;

    return {
      top,
      left,
      width,
      transform: [
        {
          translateY:
            state.value === CONTEXT_MENU_STATE.ACTIVE
              ? withSpring(tY, SPRING_CONFIGURATION)
              : withTiming(0, { duration: HOLD_ITEM_TRANSFORM_DURATION }),
        },
      ],
    };
  }, [menuProps]);

  return (
    <Animated.View style={[styles.menuWrapper, wrapperStyles]}>
      <MenuList />
    </Animated.View>
  );
};

const Menu = React.memo(MenuComponent);

export default Menu;
