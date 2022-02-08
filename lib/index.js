"use strict";

import {
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { PureComponent } from "react";

const defaultCircleSize = 16;
const defaultCircleColor = "#007AFF";
const defaultLineWidth = 2;
const defaultLineColor = "#007AFF";
const defaultTimeTextColor = "black";
const defaultDotColor = "white";
const defaultInnerCircle = "none";
const isRtl = I18nManager.isRTL;

export default class Timeline extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this._renderItem = this._renderItem.bind(this);
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.data) {
      return {
        data: nextProps.data,
      };
    }

    return null;
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.isUsingFlatlist ? (
          <FlatList
            style={[styles.listview, this.props.listViewStyle]}
            contentContainerStyle={this.props.listViewContainerStyle}
            data={this.state.data}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index + ""}
            {...this.props.options}
          />
        ) : (
          this.state.data.map((item, index) => (
            <View key={index + ""}>{this._renderItem({ item, index })}</View>
          ))
        )}
      </View>
    );
  }

  _renderItem({ item, index }) {
    let content = null;
    switch (this.props.columnFormat) {
      case "single-column-left":
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle, item.rowContainerStyle]}>
            {this.renderTime(item, index)}
            {this.renderEvent(item, index)}
            {this.renderCircle(item, index)}
          </View>
        );
        break;
      case "single-column-right":
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle, item.rowContainerStyle]}>
            {this.renderEvent(item, index)}
            {this.renderTime(item, index)}
            {this.renderCircle(item, index)}
          </View>
        );
        break;
      case "two-column":
        content =
          (item.position && item.position == "right") ||
          (!item.position && index % 2 == 0) ? (
            <View style={[styles.rowContainer, this.props.rowContainerStyle, item.rowContainerStyle]}>
              {this.renderTime(item, index)}
              {this.renderEvent(item, index)}
              {this.renderCircle(item, index)}
            </View>
          ) : (
            <View style={[styles.rowContainer, this.props.rowContainerStyle, item.rowContainerStyle]}>
              {this.renderEvent(item, index)}
              {this.renderTime(item, index)}
              {this.renderCircle(item, index)}
            </View>
          );
        break;
    }
    return <View key={index}>{content}</View>;
  }

  _renderTime(rowData, rowID) {
    if (!this.props.showTime) {
      return null;
    }
    var timeWrapper = null;
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
            (rowData.position && rowData.position == "right") ||
            (!rowData.position && rowID % 2 == 0)
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

  _renderEvent(rowData, rowID) {
    const lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth;
    const isLast = this.props.renderFullLine
      ? !this.props.renderFullLine
      : this.state.data.slice(-1)[0] === rowData;
    const lineColor = isLast
      ? "rgba(0,0,0,0)"
      : rowData.lineColor
      ? rowData.lineColor
      : this.props.lineColor;
    let opStyle = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          marginLeft: 20,
          paddingLeft: 20,
        };
        break;
      case "single-column-right":
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          marginRight: 20,
          paddingRight: 20,
        };
        break;
      case "two-column":
        opStyle =
          (rowData.position && rowData.position == "right") ||
          (!rowData.position && rowID % 2 == 0)
            ? {
                borderColor: lineColor,
                borderLeftWidth: lineWidth,
                borderRightWidth: 0,
                marginLeft: 20,
                paddingLeft: 20,
              }
            : {
                borderColor: lineColor,
                borderLeftWidth: 0,
                borderRightWidth: lineWidth,
                marginRight: 20,
                paddingRight: 20,
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
        onLayout={(evt) => {
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

  _renderDetail(rowData, rowID) {
    const { isAllowFontScaling } = this.props;
    let description;
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

  _renderCircle(rowData, rowID) {
    var circleSize = rowData.circleSize
      ? rowData.circleSize
      : this.props.circleSize
      ? this.props.circleSize
      : defaultCircleSize;
    var circleColor = rowData.circleColor
      ? rowData.circleColor
      : this.props.circleColor
      ? this.props.circleColor
      : defaultCircleColor;
    var lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth
      ? this.props.lineWidth
      : defaultLineWidth;

    var circleStyle = null;

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

    var innerCircle = null;
    switch (this.props.innerCircle) {
      case "icon":
        let iconDefault = rowData.iconDefault
          ? rowData.iconDefault
          : this.props.iconDefault;
        let iconSource = rowData.icon ? rowData.icon : iconDefault;
        if (React.isValidElement(iconSource)) {
          innerCircle = iconSource;
          break;
        }
        if (rowData.icon)
          iconSource =
            rowData.icon.constructor === String
              ? { uri: rowData.icon }
              : rowData.icon;
        let iconStyle = {
          height: circleSize,
          width: circleSize,
        };
        innerCircle = (
          <Image
            source={iconSource}
            defaultSource={typeof iconDefault === "number" && iconDefault}
            style={[iconStyle, this.props.iconStyle]}
          />
        );
        break;
      case "dot":
        const dotSize = this.props.dotSize
          ? this.props.dotSize
          : circleSize / 2;
        let dotStyle = {
          height: dotSize,
          width: dotSize,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : this.props.dotColor
            ? this.props.dotColor
            : defaultDotColor,
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
      case "element":
        innerCircle = rowData.icon;
        break;
    }
    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  }

  _renderSeparator() {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }
}

Timeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: "single-column-left",
  separator: false,
  showTime: true,
  isAllowFontScaling: true,
  isUsingFlatlist: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: "#007AFF",
    height: 30,
    justifyContent: "center",
  },
  sectionHeaderText: {
    color: "#FFF",
    fontSize: 18,
    alignSelf: "center",
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
  detail: { paddingTop: 10, paddingBottom: 10 },
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
