# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

react-native-timeline-flatlist is a React Native component for displaying timeline/schedule views. It supports customizable layouts, icons, colors, and event handling.

## Repository Structure

```
lib/
  index.js      # Main Timeline component (PureComponent)
  index.d.ts    # TypeScript definitions
examples/
  Example/      # Expo example app (SDK 54, Expo Router)
```

## Key Technical Details

- **Main component**: `lib/index.js` - Class-based PureComponent using FlatList
- **TypeScript types**: `lib/index.d.ts` - Module declaration with TimelineProps interface
- **Peer dependencies**: React >= 17.0.0, React Native >= 0.64.0
- **No build step**: Library ships raw JS, consumed directly by React Native bundler

## Development Commands

There is no test suite or build process for the library itself. The example app can be run with:

```bash
cd examples/Example
npm install
npx expo start
```

## Architecture Notes

- Uses `FlatList` by default (`isUsingFlatlist: true`), but can render without it for simpler use cases
- Supports three column formats: `single-column-left`, `single-column-right`, `two-column`
- Inner circle can be: `none`, `icon`, `dot`, or `element` (custom React node)
- RTL support via `I18nManager.isRTL`
- All render methods (renderTime, renderDetail, renderCircle) can be overridden via props

## Common Props

| Prop | Type | Description |
|------|------|-------------|
| data | Data[] | Timeline items with time, title, description, icon |
| columnFormat | string | Layout format |
| innerCircle | string | Circle content type |
| onEventPress | function | Event tap handler |
| renderTime/Detail/Circle | function | Custom render overrides |
| options | object | Props passed to underlying FlatList |
