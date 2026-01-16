import { PureComponent, ReactNode } from "react";
import { FlatListProps, ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
export type LineStyle = "solid" | "dashed" | "dotted";
export type InnerCircle = "none" | "icon" | "dot" | "element";
export type ColumnFormat = "single-column-left" | "single-column-right" | "two-column";
export type Position = "left" | "right";
export interface Data {
    time?: string;
    title?: string;
    description?: string | ReactNode;
    lineWidth?: number;
    lineStyle?: LineStyle;
    lineColor?: string;
    eventContainerStyle?: StyleProp<ViewStyle>;
    circleSize?: number;
    circleColor?: string;
    dotColor?: string;
    icon?: ImageSourcePropType | ReactNode;
    iconDefault?: ImageSourcePropType | ReactNode;
    position?: Position;
    titleStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
    columnSideMargin?: number;
    columnSidePadding?: number;
}
export interface TimelineProps {
    data: Data[];
    innerCircle?: InnerCircle;
    separator?: boolean;
    columnFormat?: ColumnFormat;
    lineWidth?: number;
    lineStyle?: LineStyle;
    lineColor?: string;
    circleSize?: number;
    circleColor?: string;
    dotColor?: string;
    dotSize?: number;
    iconDefault?: ImageSourcePropType | ReactNode;
    style?: StyleProp<ViewStyle>;
    circleStyle?: StyleProp<ViewStyle>;
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
    onEventPress?: (event: Data) => void;
    renderTime?: (rowData: Data, rowID: number) => ReactNode;
    renderDetail?: (rowData: Data, rowID: number) => ReactNode;
    renderCircle?: (rowData: Data, rowID: number) => ReactNode;
    renderFullLine?: boolean;
    options?: Partial<FlatListProps<Data>>;
    showTime?: boolean;
    isUsingFlatlist?: boolean;
    isAllowFontScaling?: boolean;
    columnSideMargin?: number;
    columnSidePadding?: number;
}
interface TimelineState {
    data: Data[];
    x: number;
    width: number;
}
export default class Timeline extends PureComponent<TimelineProps, TimelineState> {
    static defaultProps: Partial<TimelineProps>;
    renderTime: (rowData: Data, rowID: number) => ReactNode;
    renderDetail: (rowData: Data, rowID: number) => ReactNode;
    renderCircle: (rowData: Data, rowID: number) => ReactNode;
    renderEvent: (rowData: Data, rowID: number) => ReactNode;
    constructor(props: TimelineProps);
    static getDerivedStateFromProps(nextProps: TimelineProps, prevState: TimelineState): Partial<TimelineState> | null;
    private _keyExtractor;
    render(): ReactNode;
    private _renderItem;
    private _renderTime;
    private _renderEvent;
    private _renderDetail;
    private _renderCircle;
    private _renderSeparator;
}
export {};
