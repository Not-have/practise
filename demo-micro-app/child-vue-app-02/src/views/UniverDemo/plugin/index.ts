import type { Dependency } from '@univerjs/presets'
import { Inject, Injector, LocaleService, Plugin, touchDependencies, UniverInstanceType } from '@univerjs/presets'
import { CustomMenuController } from './custom-menu.controller'

const SHEET_CUSTOM_MENU_PLUGIN = 'SHEET_CUSTOM_MENU_PLUGIN'

export class UniverSheetsCustomMenuPlugin extends Plugin {
  static override type = UniverInstanceType.UNIVER_SHEET
  static override pluginName = SHEET_CUSTOM_MENU_PLUGIN

  constructor(
    protected readonly _injector: Injector,
  ) {
    super()
  }

  override onStarting(): void {
    ([
      [CustomMenuController],
    ] as Dependency[]).forEach((d: any) => this._injector.add(d))
  }

  override onRendered(): void {
    touchDependencies(this._injector, [
      [CustomMenuController],
    ])
  }
}