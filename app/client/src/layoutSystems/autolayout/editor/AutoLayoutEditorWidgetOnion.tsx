import SnipeableComponent from "layoutSystems/common/SnipeableComponent";
import { get } from "lodash";
import React from "react";
import { EVAL_ERROR_PATH } from "utils/DynamicBindingUtils";
import type { BaseWidgetProps } from "widgets/BaseWidgetHOC/withBaseWidgetHOC";
import DraggableComponent from "../../common/DraggableComponent";
import { WidgetNameLayer } from "../../common/WidgetNameLayer";
import { AutoLayoutWidgetComponent } from "../common/AutoLayoutWidgetNameComponent";
import FlexComponent from "../common/FlexComponent";
import { FlexVerticalAlignment, LayoutDirection } from "../utils/constants";
import { AutoResizableLayer } from "./AutoResizableLayer";

export const AutoLayoutEditorWidgetOnion = (props: BaseWidgetProps) => {
  return (
    <FlexComponent
      alignment={props.alignment}
      componentHeight={props.componentHeight}
      componentWidth={props.componentWidth}
      direction={props.direction || LayoutDirection.Horizontal}
      flexVerticalAlignment={
        props.flexVerticalAlignment || FlexVerticalAlignment.Bottom
      }
      focused={props.focused}
      isMobile={props.isMobile || false}
      isResizeDisabled={props.resizeDisabled}
      parentColumnSpace={props.parentColumnSpace}
      parentId={props.parentId}
      renderMode={props.renderMode}
      responsiveBehavior={props.responsiveBehavior}
      selected={props.selected}
      widgetId={props.widgetId}
      widgetName={props.widgetName}
      widgetType={props.type}
    >
      <SnipeableComponent type={props.type} widgetId={props.widgetId}>
        <DraggableComponent
          bottomRow={props.bottomRow}
          isFlexChild
          leftColumn={props.leftColumn}
          parentColumnSpace={props.parentColumnSpace}
          parentId={props.parentId}
          parentRowSpace={props.parentRowSpace}
          resizeDisabled={props.resizeDisabled}
          rightColumn={props.rightColumn}
          topRow={props.topRow}
          type={props.type}
          widgetId={props.widgetId}
        >
          <WidgetNameLayer
            componentWidth={props.componentWidth}
            detachFromLayout={props.detachFromLayout}
            disablePropertyPane={props.disablePropertyPane}
            evalErrorsObj={get(props, EVAL_ERROR_PATH, {})}
            parentId={props.parentId}
            topRow={props.topRow}
            type={props.type}
            widgetId={props.widgetId}
            widgetName={props.widgetName}
          >
            <AutoResizableLayer {...props}>
              <AutoLayoutWidgetComponent {...props}>
                {props.children}
              </AutoLayoutWidgetComponent>
            </AutoResizableLayer>
          </WidgetNameLayer>
        </DraggableComponent>
      </SnipeableComponent>
    </FlexComponent>
  );
};