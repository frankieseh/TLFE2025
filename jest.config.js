import { createDefaultPreset } from 'ts-jest'

const tsJestPreset = createDefaultPreset()

export default {
  ...tsJestPreset,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
}
