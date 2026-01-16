import React, { PureComponent, ReactElement, ReactNode } from "react";
import {
  FlatList,
  FlatListProps,
  I18nManager,
  Image,
  ImageSourcePropType,
  ImageStyle,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Constants
const defaultCircleSize = 16;
const defaultCircleColor = "#007AFF";
const defaultLineWidth = 2;
const defaultLineStyle: LineStyle = "solid";
const defaultLineColor = "#007AFF";
const defaultTimeTextColor = "black";
const defaultDotColor = "white";
const defaultInnerCircle: InnerCircle = "none";
const isRtl = I18nManager.isRTL;

// Types
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
  static defaultProps: Partial<TimelineProps> = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineStyle: defaultLineStyle,
    lineColor: defaultLineColor,
    innerCircle: defaultInnerCircle,
    columnFormat: "single-column-left",
    separator: false,
    showTime: true,
    isAllowFontScaling: true,
    isUsingFlatlist: true,
    columnSideMargin: 20,
    columnSidePadding: 20,
  };

  renderTime: (rowData: Data, rowID: number) => ReactNode;
  renderDetail: (rowData: Data, rowID: number) => ReactNode;
  renderCircle: (rowData: Data, rowID: number) => ReactNode;
  renderEvent: (rowData: Data, rowID: number) => ReactNode;

  constructor(props: TimelineProps) {
    super(props);

    this.renderTime = (
      this.props.renderTime ? this.props.renderTime : this._renderTime
    ).bind(this);
    this.renderDetail = (
      this.props.renderDetail ? this.props.renderDetail : this._renderDetail
    ).bind(this);
    this.renderCircle = (
      this.props.renderCircle ? this.props.renderCircle : this._renderCircle
    ).bind(this);
    this.renderEvent = this._renderEvent.bind(this);

    this.state = {
      data: this.props.data,
      x: 0,
      width: 0,
    };
  }

  static getDerivedStateFromProps(
    nextProps: TimelineProps,
    prevState: TimelineState
  ): Partial<TimelineState> | null {
    if (prevState.data !== nextProps.data) {
      return {
        data: nextProps.data,
      };
    }
    return null;
  }

  private _keyExtractor = (item: Data, index: number): string => {
    if (this.props.options?.keyExtractor) {
      return this.props.options.keyExtractor(item, index);
    }
    return index.toString();
  };

  render(): ReactNode {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.isUsingFlatlist ? (
          <FlatList
            style={[styles.listview, this.props.listViewStyle]}
            contentContainerStyle={this.props.listViewContainerStyle}
            data={this.state.data}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            {...this.props.options}
          />
        ) : (
          <View
            style={[
              styles.listview,
              this.props.listViewStyle,
              this.props.listViewContainerStyle,
            ]}
          >
            {this.state.data.map((item, index) => (
              <View key={this._keyExtractor(item, index)}>
                {this._renderItem({ item, index })}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  private _renderItem = ({
    item,
    index,
  }: {
    item: Data;
    index: number;
  }): ReactElement | null => {
    let content: ReactElement | null = null;
    switch (this.props.columnFormat) {
      case "single-column-left":
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderTime(item, index)}
            {this.renderEvent(item, index)}
            {this.renderCircle(item, index)}
          </View>
        );
        break;
      case "single-column-right":
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderEvent(item, index)}
            {this.renderTime(item, index)}
            {this.renderCircle(item, index)}
          </View>
        );
        break;
      case "two-column":
        content =
          (item.position && item.position === "right") ||
          (!item.position && index % 2 === 0) ? (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
              {this.renderTime(item, index)}
              {this.renderEvent(item, index)}
              {this.renderCircle(item, index)}
            </View>
          ) : (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
              {this.renderEvent(item, index)}
              {this.renderTime(item, index)}
              {this.renderCircle(item, index)}
            </View>
          );
        break;
    }
    return <View key={index}>{content}</View>;
  };

  private _renderTime(rowData: Data, rowID: number): ReactNode {
    if (!this.props.showTime) {
      return null;
    }
    let timeWrapper: ViewStyle | null = null;
    switch (this.props.columnFormat) {
      case "single-column-left":
        timeWrapper = {
          alignItems: "flex-end",
        };
        break;
      case "single-column-right":
        timeWrapper = {
          alignItems: "flex-start",
        };
        break;
      case "two-column":
        timeWrapper = {
          flex: 1,
          alignItems:
            (rowData.position && rowData.position === "right") ||
            (!rowData.position && rowID % 2 === 0)
              ? "flex-end"
              : "flex-start",
        };
        break;
    }
    const { isAllowFontScaling } = this.props;
    return (
      <View style={timeWrapper}>
        <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
          <Text
            style={[styles.time, this.props.timeStyle]}
            allowFontScaling={isAllowFontScaling}
          >
            {rowData.time}
          </Text>
        </View>
      </View>
    );
  }

  private _renderEvent(rowData: Data, rowID: number): ReactNode {
    const lineWidth = rowData.lineWidth ?? this.props.lineWidth;
    const lineStyle = rowData.lineStyle ?? this.props.lineStyle;
    const columnSideMargin = rowData.columnSideMargin ?? this.props.columnSideMargin;
    const columnSidePadding = rowData.columnSidePadding ?? this.props.columnSidePadding;
    const isLast = this.props.renderFullLine
      ? !this.props.renderFullLine
      : this.state.data.slice(-1)[0] === rowData;
    const lineColor = isLast
      ? "rgba(0,0,0,0)"
      : rowData.lineColor ?? this.props.lineColor;
    let opStyle: ViewStyle | null = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderStyle: lineStyle,
          borderRightWidth: 0,
          marginLeft: columnSideMargin,
          paddingLeft: columnSidePadding,
        };
        break;
      case "single-column-right":
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          borderStyle: lineStyle,
          marginRight: columnSideMargin,
          paddingRight: columnSidePadding,
        };
        break;
      case "two-column":
        opStyle =
          (rowData.position && rowData.position === "right") ||
          (!rowData.position && rowID % 2 === 0)
            ? {
                borderColor: lineColor,
                borderLeftWidth: lineWidth,
                borderStyle: lineStyle,
                borderRightWidth: 0,
                marginLeft: columnSideMargin,
                paddingLeft: columnSidePadding,
              }
            : {
                borderColor: lineColor,
                borderLeftWidth: 0,
                borderRightWidth: lineWidth,
                borderStyle: lineStyle,
                marginRight: columnSideMargin,
                paddingRight: columnSidePadding,
              };
        break;
    }

    return (
      <View
        style={[
          styles.details,
          opStyle,
          this.props.eventContainerStyle,
          rowData.eventContainerStyle,
        ]}
        onLayout={(evt: LayoutChangeEvent) => {
          if (!this.state.x && !this.state.width) {
            const { x, width } = evt.nativeEvent.layout;
            this.setState({ x, width });
          }
        }}
      >
        <TouchableOpacity
          disabled={this.props.onEventPress == null}
          style={[this.props.detailContainerStyle]}
          onPress={() =>
            this.props.onEventPress ? this.props.onEventPress(rowData) : null
          }
        >
          <View style={[styles.detail, this.props.eventDetailStyle]}>
            {this.renderDetail(rowData, rowID)}
          </View>
          {this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  }

  private _renderDetail(rowData: Data, _rowID: number): ReactNode {
    const { isAllowFontScaling } = this.props;
    let description: ReactNode;
    if (typeof rowData.description === "string") {
      description = (
        <Text
          style={[
            styles.description,
            this.props.descriptionStyle,
            rowData.descriptionStyle,
          ]}
          allowFontScaling={isAllowFontScaling}
        >
          {rowData.description}
        </Text>
      );
    } else if (typeof rowData.description === "object") {
      description = rowData.description;
    }

    return (
      <View style={styles.container}>
        <Text
          style={[styles.title, this.props.titleStyle, rowData.titleStyle]}
          allowFontScaling={isAllowFontScaling}
        >
          {rowData.title}
        </Text>
        {description}
      </View>
    );
  }

  private _renderCircle(rowData: Data, _rowID: number): ReactNode {
    const circleSize =
      rowData.circleSize ?? this.props.circleSize ?? defaultCircleSize;
    const circleColor =
      rowData.circleColor ?? this.props.circleColor ?? defaultCircleColor;
    const lineWidth =
      rowData.lineWidth ?? this.props.lineWidth ?? defaultLineWidth;

    let circleStyle: ViewStyle | null = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        circleStyle = isRtl
          ? {
              width: this.state.width ? circleSize : 0,
              height: this.state.width ? circleSize : 0,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              right: this.state.width - circleSize / 2 - (lineWidth - 1) / 2,
            }
          : {
              width: this.state.x ? circleSize : 0,
              height: this.state.x ? circleSize : 0,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2,
            };
        break;
      case "single-column-right":
        circleStyle = {
          width: this.state.width ? circleSize : 0,
          height: this.state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2,
        };
        break;
      case "two-column":
        circleStyle = {
          width: this.state.width ? circleSize : 0,
          height: this.state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2,
        };
        break;
    }

    let innerCircle: ReactNode = null;
    switch (this.props.innerCircle) {
      case "icon": {
        const iconDefault = rowData.iconDefault ?? this.props.iconDefault;
        let iconSource: ImageSourcePropType | ReactNode = rowData.icon ?? iconDefault;
        if (React.isValidElement(iconSource)) {
          innerCircle = iconSource;
          break;
        }
        if (rowData.icon) {
          iconSource =
            typeof rowData.icon === "string"
              ? { uri: rowData.icon }
              : (rowData.icon as ImageSourcePropType);
        }
        const iconStyle: ImageStyle = {
          height: circleSize,
          width: circleSize,
        };
        innerCircle = (
          <Image
            source={iconSource as ImageSourcePropType}
            defaultSource={
              typeof iconDefault === "number" ? iconDefault : undefined
            }
            style={[iconStyle, this.props.iconStyle]}
          />
        );
        break;
      }
      case "dot": {
        const dotSize = this.props.dotSize ?? circleSize / 2;
        const dotStyle: ViewStyle = {
          height: dotSize,
          width: dotSize,
          borderRadius: circleSize / 4,
          backgroundColor:
            rowData.dotColor ?? this.props.dotColor ?? defaultDotColor,
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
      }
      case "element":
        innerCircle = rowData.icon as ReactNode;
        break;
    }
    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  }

  private _renderSeparator(): ReactNode {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  timeContainer: {
    minWidth: 45,
  },
  time: {
    textAlign: "right",
    color: defaultTimeTextColor,
    overflow: "hidden",
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: "column",
    flex: 1,
  },
  detail: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  description: {
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#aaa",
    marginTop: 10,
    marginBottom: 10,
  },
});
