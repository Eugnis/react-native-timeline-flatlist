import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import Timeline, { Data } from '../src';

describe('Timeline', () => {
  const mockData: Data[] = [
    { time: '09:00', title: 'Event 1', description: 'Description 1' },
    { time: '10:30', title: 'Event 2', description: 'Description 2' },
    { time: '12:00', title: 'Event 3', description: 'Description 3' },
  ];

  describe('Rendering', () => {
    it('renders all timeline items', () => {
      render(<Timeline data={mockData} />);

      expect(screen.getByText('Event 1')).toBeOnTheScreen();
      expect(screen.getByText('Event 2')).toBeOnTheScreen();
      expect(screen.getByText('Event 3')).toBeOnTheScreen();
    });

    it('renders time values', () => {
      render(<Timeline data={mockData} />);

      expect(screen.getByText('09:00')).toBeOnTheScreen();
      expect(screen.getByText('10:30')).toBeOnTheScreen();
      expect(screen.getByText('12:00')).toBeOnTheScreen();
    });

    it('renders descriptions', () => {
      render(<Timeline data={mockData} />);

      expect(screen.getByText('Description 1')).toBeOnTheScreen();
      expect(screen.getByText('Description 2')).toBeOnTheScreen();
    });

    it('renders with empty data array', () => {
      const { toJSON } = render(<Timeline data={[]} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders single item', () => {
      const singleItem: Data[] = [{ time: '09:00', title: 'Only Event' }];
      render(<Timeline data={singleItem} />);

      expect(screen.getByText('Only Event')).toBeOnTheScreen();
    });
  });

  describe('Props', () => {
    it('hides time when showTime is false', () => {
      render(<Timeline data={mockData} showTime={false} />);

      expect(screen.queryByText('09:00')).toBeNull();
      expect(screen.queryByText('10:30')).toBeNull();
    });

    it('renders separator when separator prop is true', () => {
      const { toJSON } = render(<Timeline data={mockData} separator={true} />);
      const tree = JSON.stringify(toJSON());
      expect(tree).toBeTruthy();
    });

    it('renders without FlatList when isUsingFlatlist is false', () => {
      render(<Timeline data={mockData} isUsingFlatlist={false} />);

      expect(screen.getByText('Event 1')).toBeOnTheScreen();
      expect(screen.getByText('Event 2')).toBeOnTheScreen();
    });

    it('applies custom circleSize', () => {
      const { toJSON } = render(<Timeline data={mockData} circleSize={24} />);
      expect(toJSON()).toBeTruthy();
    });

    it('applies custom lineWidth', () => {
      const { toJSON } = render(<Timeline data={mockData} lineWidth={4} />);
      expect(toJSON()).toBeTruthy();
    });

    it('applies custom colors', () => {
      const { toJSON } = render(
        <Timeline
          data={mockData}
          circleColor="#FF0000"
          lineColor="#00FF00"
          dotColor="#0000FF"
        />
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Column Formats', () => {
    it('renders single-column-left format', () => {
      render(<Timeline data={mockData} columnFormat="single-column-left" />);
      expect(screen.getByText('Event 1')).toBeOnTheScreen();
    });

    it('renders single-column-right format', () => {
      render(<Timeline data={mockData} columnFormat="single-column-right" />);
      expect(screen.getByText('Event 1')).toBeOnTheScreen();
    });

    it('renders two-column format', () => {
      render(<Timeline data={mockData} columnFormat="two-column" />);
      expect(screen.getByText('Event 1')).toBeOnTheScreen();
    });

    it('respects position property in two-column format', () => {
      const dataWithPosition: Data[] = [
        { time: '09:00', title: 'Left Event', position: 'left' },
        { time: '10:00', title: 'Right Event', position: 'right' },
      ];
      render(<Timeline data={dataWithPosition} columnFormat="two-column" />);

      expect(screen.getByText('Left Event')).toBeOnTheScreen();
      expect(screen.getByText('Right Event')).toBeOnTheScreen();
    });
  });

  describe('Inner Circle Types', () => {
    it('renders with innerCircle none', () => {
      const { toJSON } = render(<Timeline data={mockData} innerCircle="none" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with innerCircle dot', () => {
      const { toJSON } = render(<Timeline data={mockData} innerCircle="dot" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with innerCircle icon', () => {
      const dataWithIcon: Data[] = [
        { time: '09:00', title: 'Event', icon: { uri: 'https://example.com/icon.png' } },
      ];
      const { toJSON } = render(<Timeline data={dataWithIcon} innerCircle="icon" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with innerCircle element', () => {
      const dataWithElement: Data[] = [
        {
          time: '09:00',
          title: 'Event',
          icon: <View testID="custom-icon" />,
        },
      ];
      const { toJSON } = render(<Timeline data={dataWithElement} innerCircle="element" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Line Styles', () => {
    it('renders with solid line style', () => {
      const { toJSON } = render(<Timeline data={mockData} lineStyle="solid" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with dashed line style', () => {
      const { toJSON } = render(<Timeline data={mockData} lineStyle="dashed" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with dotted line style', () => {
      const { toJSON } = render(<Timeline data={mockData} lineStyle="dotted" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Callbacks', () => {
    it('calls onEventPress with correct data when event is pressed', () => {
      const onEventPress = jest.fn();
      render(<Timeline data={mockData} onEventPress={onEventPress} />);

      fireEvent.press(screen.getByText('Event 1'));
      expect(onEventPress).toHaveBeenCalledWith(mockData[0]);
    });

    it('calls onEventPress for different events', () => {
      const onEventPress = jest.fn();
      render(<Timeline data={mockData} onEventPress={onEventPress} />);

      fireEvent.press(screen.getByText('Event 2'));
      expect(onEventPress).toHaveBeenCalledWith(mockData[1]);

      fireEvent.press(screen.getByText('Event 3'));
      expect(onEventPress).toHaveBeenCalledWith(mockData[2]);
    });

    it('does not crash when onEventPress is not provided', () => {
      render(<Timeline data={mockData} />);

      expect(() => {
        fireEvent.press(screen.getByText('Event 1'));
      }).not.toThrow();
    });
  });

  describe('Custom Render Functions', () => {
    it('uses custom renderTime function', () => {
      const customRenderTime = (rowData: Data) => (
        <Text testID="custom-time">{`Custom: ${rowData.time}`}</Text>
      );

      render(<Timeline data={mockData} renderTime={customRenderTime} />);
      expect(screen.getByText('Custom: 09:00')).toBeOnTheScreen();
    });

    it('uses custom renderDetail function', () => {
      const customRenderDetail = (rowData: Data) => (
        <Text testID="custom-detail">{`Detail: ${rowData.title}`}</Text>
      );

      render(<Timeline data={mockData} renderDetail={customRenderDetail} />);
      expect(screen.getByText('Detail: Event 1')).toBeOnTheScreen();
    });

    it('uses custom renderCircle function', () => {
      const customRenderCircle = () => (
        <View testID="custom-circle" />
      );

      render(<Timeline data={mockData} renderCircle={customRenderCircle} />);
      expect(screen.getAllByTestId('custom-circle')).toHaveLength(3);
    });
  });

  describe('Description Types', () => {
    it('renders string description', () => {
      render(<Timeline data={mockData} />);
      expect(screen.getByText('Description 1')).toBeOnTheScreen();
    });

    it('renders ReactNode description', () => {
      const dataWithNodeDescription: Data[] = [
        {
          time: '09:00',
          title: 'Event',
          description: <Text testID="custom-description">Custom Description</Text>,
        },
      ];
      render(<Timeline data={dataWithNodeDescription} />);
      expect(screen.getByTestId('custom-description')).toBeOnTheScreen();
    });
  });

  describe('Per-item Styling', () => {
    it('applies per-item lineColor', () => {
      const dataWithColors: Data[] = [
        { time: '09:00', title: 'Event 1', lineColor: '#FF0000' },
        { time: '10:00', title: 'Event 2', lineColor: '#00FF00' },
      ];
      const { toJSON } = render(<Timeline data={dataWithColors} />);
      expect(toJSON()).toBeTruthy();
    });

    it('applies per-item circleColor', () => {
      const dataWithColors: Data[] = [
        { time: '09:00', title: 'Event 1', circleColor: '#FF0000' },
        { time: '10:00', title: 'Event 2', circleColor: '#00FF00' },
      ];
      const { toJSON } = render(<Timeline data={dataWithColors} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Data Updates', () => {
    it('updates when data prop changes', () => {
      const { rerender } = render(<Timeline data={mockData} />);

      expect(screen.getByText('Event 1')).toBeOnTheScreen();

      const newData: Data[] = [
        { time: '14:00', title: 'New Event', description: 'New Description' },
      ];
      rerender(<Timeline data={newData} />);

      expect(screen.getByText('New Event')).toBeOnTheScreen();
      expect(screen.queryByText('Event 1')).toBeNull();
    });
  });

  describe('Sparse Data (missing optional fields)', () => {
    it('renders items with only a title', () => {
      const sparse: Data[] = [{ title: 'Title Only' }];
      render(<Timeline data={sparse} />);
      expect(screen.getByText('Title Only')).toBeOnTheScreen();
    });

    it('renders items with only a time', () => {
      const sparse: Data[] = [{ time: '08:00' }];
      render(<Timeline data={sparse} />);
      expect(screen.getByText('08:00')).toBeOnTheScreen();
    });

    it('renders completely empty items without crashing', () => {
      const sparse: Data[] = [{}, {}, {}];
      const { toJSON } = render(<Timeline data={sparse} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders item without description', () => {
      const sparse: Data[] = [{ time: '09:00', title: 'No Description' }];
      render(<Timeline data={sparse} />);
      expect(screen.getByText('No Description')).toBeOnTheScreen();
    });

    it('renders null description without crashing', () => {
      const sparse: Data[] = [
        { time: '09:00', title: 'Null Desc', description: null },
      ];
      render(<Timeline data={sparse} />);
      expect(screen.getByText('Null Desc')).toBeOnTheScreen();
    });

    it('renders innerCircle icon when item has no icon and no iconDefault', () => {
      const sparse: Data[] = [{ time: '09:00', title: 'No Icon' }];
      const { toJSON } = render(<Timeline data={sparse} innerCircle="icon" />);
      expect(toJSON()).toBeTruthy();
      expect(screen.getByText('No Icon')).toBeOnTheScreen();
    });

    it('renders innerCircle icon falling back to iconDefault prop', () => {
      const sparse: Data[] = [{ time: '09:00', title: 'Default Icon' }];
      const { toJSON } = render(
        <Timeline
          data={sparse}
          innerCircle="icon"
          iconDefault={{ uri: 'https://example.com/default.png' }}
        />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('renders innerCircle icon with a string icon uri', () => {
      const sparse: Data[] = [
        { time: '09:00', title: 'String Icon', icon: 'https://example.com/i.png' },
      ];
      const { toJSON } = render(<Timeline data={sparse} innerCircle="icon" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders innerCircle element when item icon is missing', () => {
      const sparse: Data[] = [{ time: '09:00', title: 'No Element' }];
      const { toJSON } = render(<Timeline data={sparse} innerCircle="element" />);
      expect(toJSON()).toBeTruthy();
      expect(screen.getByText('No Element')).toBeOnTheScreen();
    });

    it('renders sparse data in two-column format without crashing', () => {
      const sparse: Data[] = [{ title: 'A' }, {}, { time: '10:00' }];
      const { toJSON } = render(
        <Timeline data={sparse} columnFormat="two-column" />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('renders sparse data without FlatList without crashing', () => {
      const sparse: Data[] = [{}, { title: 'B' }];
      render(<Timeline data={sparse} isUsingFlatlist={false} />);
      expect(screen.getByText('B')).toBeOnTheScreen();
    });
  });

  describe('Non-FlatList Path', () => {
    it('renders empty data without FlatList', () => {
      const { toJSON } = render(<Timeline data={[]} isUsingFlatlist={false} />);
      expect(toJSON()).toBeTruthy();
    });

    it('fires onEventPress without FlatList', () => {
      const onEventPress = jest.fn();
      render(
        <Timeline
          data={mockData}
          isUsingFlatlist={false}
          onEventPress={onEventPress}
        />
      );
      fireEvent.press(screen.getByText('Event 2'));
      expect(onEventPress).toHaveBeenCalledWith(mockData[1]);
    });

    it('uses custom keyExtractor without FlatList', () => {
      const customKeyExtractor = jest.fn(
        (_item: Data, index: number) => `key-${index}`
      );
      render(
        <Timeline
          data={mockData}
          isUsingFlatlist={false}
          options={{ keyExtractor: customKeyExtractor }}
        />
      );
      expect(customKeyExtractor).toHaveBeenCalled();
      expect(screen.getByText('Event 1')).toBeOnTheScreen();
    });

    it('supports all column formats without FlatList', () => {
      const formats = [
        'single-column-left',
        'single-column-right',
        'two-column',
      ] as const;
      formats.forEach((columnFormat) => {
        const { unmount } = render(
          <Timeline data={mockData} isUsingFlatlist={false} columnFormat={columnFormat} />
        );
        expect(screen.getByText('Event 1')).toBeOnTheScreen();
        unmount();
      });
    });
  });

  describe('Separator', () => {
    it('renders content with separator enabled and custom style', () => {
      render(
        <Timeline
          data={mockData}
          separator={true}
          separatorStyle={{ backgroundColor: '#000' }}
        />
      );
      expect(screen.getByText('Event 1')).toBeOnTheScreen();
      expect(screen.getByText('Event 3')).toBeOnTheScreen();
    });

    it('renders identical content with separator disabled', () => {
      render(<Timeline data={mockData} separator={false} />);
      expect(screen.getByText('Event 1')).toBeOnTheScreen();
    });
  });

  describe('Misc Stability', () => {
    it('renders with renderFullLine enabled', () => {
      render(<Timeline data={mockData} renderFullLine={true} />);
      expect(screen.getByText('Event 3')).toBeOnTheScreen();
    });

    it('renders with all styling props supplied', () => {
      const { toJSON } = render(
        <Timeline
          data={mockData}
          style={{ padding: 1 }}
          listViewStyle={{ padding: 1 }}
          listViewContainerStyle={{ padding: 1 }}
          timeStyle={{ color: 'red' }}
          titleStyle={{ color: 'red' }}
          descriptionStyle={{ color: 'red' }}
          circleStyle={{ borderWidth: 1 }}
          rowContainerStyle={{ padding: 1 }}
          eventContainerStyle={{ padding: 1 }}
          eventDetailStyle={{ padding: 1 }}
          timeContainerStyle={{ padding: 1 }}
          detailContainerStyle={{ padding: 1 }}
        />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('renders with isAllowFontScaling false', () => {
      render(<Timeline data={mockData} isAllowFontScaling={false} />);
      expect(screen.getByText('Event 1')).toBeOnTheScreen();
    });

    it('renders with dotSize and innerCircle dot', () => {
      const { toJSON } = render(
        <Timeline data={mockData} innerCircle="dot" dotSize={6} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('rerenders from populated to empty data without crashing', () => {
      const { rerender } = render(<Timeline data={mockData} />);
      rerender(<Timeline data={[]} />);
      expect(screen.queryByText('Event 1')).toBeNull();
    });
  });

  describe('FlatList Options', () => {
    it('passes options to FlatList', () => {
      const { toJSON } = render(
        <Timeline
          data={mockData}
          options={{
            initialNumToRender: 5,
            maxToRenderPerBatch: 10,
          }}
        />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('uses custom keyExtractor from options', () => {
      const customKeyExtractor = (_item: Data, index: number) => `custom-${index}`;
      const { toJSON } = render(
        <Timeline
          data={mockData}
          options={{ keyExtractor: customKeyExtractor }}
        />
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Defensive Guards', () => {
    it('does not crash with null data in non-FlatList mode', () => {
      const { toJSON } = render(
        <Timeline data={null as unknown as Data[]} isUsingFlatlist={false} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('does not crash with undefined data in FlatList mode', () => {
      const { toJSON } = render(
        <Timeline data={undefined as unknown as Data[]} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('renders rows from options.data when data prop is null', () => {
      render(
        <Timeline data={null as unknown as Data[]} options={{ data: mockData }} />
      );
      expect(screen.getByText('Event 1')).toBeOnTheScreen();
    });

    it('ignores layout events delivered after unmount', () => {
      const { UNSAFE_getAllByType, unmount } = render(
        <Timeline data={mockData} isUsingFlatlist={false} />
      );
      const layoutHandlers = UNSAFE_getAllByType(View)
        .map((node) => node.props.onLayout)
        .filter(Boolean);
      expect(layoutHandlers.length).toBeGreaterThan(0);
      unmount();
      expect(() =>
        layoutHandlers.forEach((handler) =>
          handler({ nativeEvent: { layout: { x: 50, y: 0, width: 60, height: 40 } } })
        )
      ).not.toThrow();
    });
  });
});
