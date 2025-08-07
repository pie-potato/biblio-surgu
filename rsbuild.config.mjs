import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
  ],
  html: {
    title: 'БИЦ СурГУ', // Заголовок по умолчанию
    favicon: './public/media/logo2.png', // Путь к favicon
  }
});
