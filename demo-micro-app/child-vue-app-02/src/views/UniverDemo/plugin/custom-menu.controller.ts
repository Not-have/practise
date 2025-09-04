import { Disposable, ICommandService, Inject, Injector } from '@univerjs/core'
import { ComponentManager, IMenuManagerService } from '@univerjs/ui'

export class CustomMenuController extends Disposable {
  constructor(
    private readonly _injector: Injector,
    private readonly _commandService: ICommandService,
    private readonly _menuManagerService: IMenuManagerService,
    private readonly _componentManager: ComponentManager,
  ) {
    super()

    this._initCommands()
    this._registerComponents()
    this._initMenus()
  }

  /**
   * register commands
   */
  private _initCommands(): void {
    // 注册自定义命令
    this._commandService.registerCommand({
      id: 'custom-copy',
      handler: () => {
        console.log('执行自定义复制操作')
        // 在这里实现自定义复制逻辑
      }
    } as any)

    this._commandService.registerCommand({
      id: 'custom-paste',
      handler: () => {
        console.log('执行自定义粘贴操作')
        // 在这里实现自定义粘贴逻辑
      }
    } as any)

    this._commandService.registerCommand({
      id: 'custom-cut',
      handler: () => {
        console.log('执行自定义剪切操作')
        // 在这里实现自定义剪切逻辑
      }
    } as any)

    this._commandService.registerCommand({
      id: 'custom-delete',
      handler: () => {
        console.log('执行自定义删除操作')
        // 在这里实现自定义删除逻辑
      }
    } as any)

    this._commandService.registerCommand({
      id: 'custom-format',
      handler: () => {
        console.log('执行自定义格式化操作')
        // 在这里实现自定义格式化逻辑
      }
    } as any)

    this._commandService.registerCommand({
      id: 'custom-sort',
      handler: () => {
        console.log('执行自定义排序操作')
        // 在这里实现自定义排序逻辑
      }
    } as any)

    this._commandService.registerCommand({
      id: 'custom-filter',
      handler: () => {
        console.log('执行自定义筛选操作')
        // 在这里实现自定义筛选逻辑
      }
    } as any)

    this._commandService.registerCommand({
      id: 'custom-freeze',
      handler: () => {
        console.log('执行自定义冻结操作')
        // 在这里实现自定义冻结逻辑
      }
    } as any)

    this._commandService.registerCommand({
      id: 'custom-protect',
      handler: () => {
        console.log('执行自定义保护操作')
        // 在这里实现自定义保护逻辑
      }
    } as any)
  }

  /**
   * register icon components
   */
  private _registerComponents(): void {
    // 注册自定义图标组件
    this._componentManager.register('CustomCopyIcon', () => {
      return '📋'
    })

    this._componentManager.register('CustomPasteIcon', () => {
      return '📄'
    })

    this._componentManager.register('CustomCutIcon', () => {
      return '✂️'
    })

    this._componentManager.register('CustomDeleteIcon', () => {
      return '🗑️'
    })

    this._componentManager.register('CustomFormatIcon', () => {
      return '🎨'
    })

    this._componentManager.register('CustomSortIcon', () => {
      return '🔢'
    })

    this._componentManager.register('CustomFilterIcon', () => {
      return '🔍'
    })

    this._componentManager.register('CustomFreezeIcon', () => {
      return '❄️'
    })

    this._componentManager.register('CustomProtectIcon', () => {
      return '🔒'
    })
  }

  /**
   * register menu items
   */
  private _initMenus(): void {
    // 注册自定义右键菜单项
    try {
      (this._menuManagerService as any).addMenuItem({
        id: 'custom-copy-menu',
        title: '复制',
        icon: 'CustomCopyIcon',
        command: 'custom-copy',
        group: 'contextMenu',
        order: 1
      })

      (this._menuManagerService as any).addMenuItem({
        id: 'custom-paste-menu',
        title: '粘贴',
        icon: 'CustomPasteIcon',
        command: 'custom-paste',
        group: 'contextMenu',
        order: 2
      })

      (this._menuManagerService as any).addMenuItem({
        id: 'custom-cut-menu',
        title: '剪切',
        icon: 'CustomCutIcon',
        command: 'custom-cut',
        group: 'contextMenu',
        order: 3
      })

      (this._menuManagerService as any).addMenuItem({
        id: 'custom-delete-menu',
        title: '删除',
        icon: 'CustomDeleteIcon',
        command: 'custom-delete',
        group: 'contextMenu',
        order: 4
      })

      (this._menuManagerService as any).addMenuItem({
        id: 'custom-format-menu',
        title: '格式化',
        icon: 'CustomFormatIcon',
        command: 'custom-format',
        group: 'contextMenu',
        order: 5
      })

      (this._menuManagerService as any).addMenuItem({
        id: 'custom-sort-menu',
        title: '排序',
        icon: 'CustomSortIcon',
        command: 'custom-sort',
        group: 'contextMenu',
        order: 6
      })

      (this._menuManagerService as any).addMenuItem({
        id: 'custom-filter-menu',
        title: '筛选',
        icon: 'CustomFilterIcon',
        command: 'custom-filter',
        group: 'contextMenu',
        order: 7
      })

      (this._menuManagerService as any).addMenuItem({
        id: 'custom-freeze-menu',
        title: '冻结窗格',
        icon: 'CustomFreezeIcon',
        command: 'custom-freeze',
        group: 'contextMenu',
        order: 8
      })

      (this._menuManagerService as any).addMenuItem({
        id: 'custom-protect-menu',
        title: '保护行列',
        icon: 'CustomProtectIcon',
        command: 'custom-protect',
        group: 'contextMenu',
        order: 9
      })
    } catch (error) {
      console.log('菜单注册失败:', error)
    }
  }
}