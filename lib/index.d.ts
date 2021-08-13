import React from "react";
import { StyleProp, ImageStyle, TextStyle, ViewStyle, FlatListProps } from "react-native";

declare module "react-native-timeline-flatlist" {
  type Data = {
    time?: string;
    title?: string;
    description?: any;
    lineWidth?: number;
    lineColor?: string;
    eventContainerStyle?: StyleProp<ViewStyle>;
    circleSize?: number;
    circleColor?: string;
    dotColor?: string;
    icon?: string | React.ReactNode;
    position?: 'left' | 'right';
  };

  interface TimelineProps {
    data: Data[] | any;
    innerCircle?: 'none' | 'icon' | 'dot' | 'element';
    separator?: boolean;
    columnFormat?: 'single-column-left' | 'single-column-right' | 'two-column';
    lineWidth?: number;
    lineColor?: string;
    circleSize?: number;
    circleColor?: string;
    dotColor?: string;
    dotSize?: number;
    iconDefault?: string | React.ReactNode;
    style?: StyleProp<ViewStyle>;
    circleStyle?: StyleProp<ViewStyle>
    listViewStyle?: StyleProp<ViewStyle>;
    listViewContainerStyle?: StyleProp<ViewStyle>;
    timeStyle?: StyleProp<TextStyle>;
    titleStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<ImageStyle>;
    separatorStyle?: StyleProp<ViewStyle>;
    rowContainerStyle?: StyleProp<ViewStyle>;
    eventContainerStyle?: StyleProp<ViewStyle>;
    eventDetailStyle?: StyleProp<ViewStyle>;
    timeContainerStyle?: StyleProp<ViewStyle>;
    detailContainerStyle?: StyleProp<ViewStyle>;
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
    options?: FlatListProps<Data>;
    showTime?: boolean;
    isUsingFlatlist?: boolean;
  }

  export default class Timeline extends React.Component<TimelineProps> {}
}
