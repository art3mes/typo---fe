import { useEffect } from 'react'
import React from 'react';
import { AppStore } from '../state/app.store'
import { TimerStore } from '../state/timer.store'

const root = document.documentElement

export function AppSettingsProvider() {
  const { setTotalTime } = TimerStore.useStore('setTotalTime')
  const {
    currentFont,
    previewedTheme,
    time,
    theme,
    borderRadius,
  } = AppStore.useStore(
    'currentFont',
    'time',
    'previewedTheme',
    'theme',
    'musicVolume',
    'borderRadius'
  )

  useEffect(() => {
    root.attributeStyleMap.set('--radius', `${borderRadius}px`)
  }, [borderRadius])

  useEffect(() => {
    root.style.setProperty('--font-primary', currentFont)
  }, [currentFont])

  useEffect(() => {
    setTotalTime(time)
  }, [time])

  return (
    <>
      <link rel="stylesheet" href={`/css/theme_${theme}.css`} />
      <link
        rel="stylesheet"
        href={`/css/theme_${previewedTheme ?? theme}.css`}
      />
    </>
  )
}
