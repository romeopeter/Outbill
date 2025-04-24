import React from "react";

/* ---------------------------------------------------- */

export type UseSwitchShape = {
    isOn: () => void;
    isOff: () => void;
    toggleSwitch: () => void;
    switchValue: boolean;
  };

/**
 * he useSwitch hook returns a stateful boolean value and a UseSwitchShape object.
 *
 * @param init boolean
 * @returns UseSwitchShape
 */
export function useSwitch(init?: boolean): UseSwitchShape {
  const [state, setState] = React.useState(init ? init : false);

  return {
    isOn: () => setState(true),
    isOff: () => setState(false),
    toggleSwitch: () => setState(!state),
    switchValue: state,
  };
}