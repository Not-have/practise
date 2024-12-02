import * as esbuild from 'esbuild'
import esbuildPluginLicense from 'esbuild-plugin-license';

esbuild.build({
  entryPoints: ['index.ts'],
  outdir: 'dist',
  plugins: [esbuildPluginLicense()],
  bundle: true,
  platform: 'node'
})
