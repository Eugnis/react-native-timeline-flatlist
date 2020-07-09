import React from "react";
import { StyleProp, ViewStyle } from "react-native";

declare module "react-native-timeline-flatlist" {
  type Data = {
    time?: string;
    title?: string;
    description?: any;
    lineWidth?: number;
    lineColor?: string;
    eventContainerStyle?: any;
    circleSize?: number;
    circleColor?: string;
    dotColor?: string;
    icon?: string | React.ReactNode;
    position?: string;
  };

  interface TimelineProps {
    data: Data[] | any;
    innerCircle?: string;
    separator?: boolean;
    columnFormat?: string;
    lineWidth?: number;
    lineColor?: string;
    circleSize?: number;
    circleColor?: string;
    dotColor?: string;
    dotSize?: number;
    iconDefault?: string | React.ReactNode;
    style?: StyleProp<ViewStyle>;
    listViewStyle?: any;
    listViewContainerStyle?: any;
    timeStyle?: any;
    titleStyle?: any;
    descriptionStyle?: any;
    iconStyle?: any;
    separatorStyle?: any;
    rowContainerStyle?: any;
    eventContainerStyle?: any;
    eventDetailStyle?: any;
    timeContainerStyle?: any;
    detailContainerStyle?: any;
    onEventPress?: (event: Event) => any;
    renderTime?: (rowData: Data | any, sectionID: number, rowID: number) => any;
    renderDetail?: (
      rowData: Data | any,
      sectionID: number,
      rowID: number
    ) => any;
    renderCircle?: (
      rowData: Data | any,
      sectionID: number,
      rowID: number
    ) => any;
    renderFullLine?: boolean;
    options?: any;
    showTime?: boolean;
  }

  export default class Timeline extends React.Component<TimelineProps> {}
}
