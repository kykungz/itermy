import execa from 'execa'
import shellEnv from 'shell-env'

const { ITERM_PROFILE } = shellEnv.sync()

type Pane = { commands: string | string[] } | { commands: string | string[] }[]

type InstanceOptions = {}

type RunCommandsParams = {
  paneId: string
  commands: string | string[]
}

type SplitParams = {
  sourceId: string
  destinationId: string
}

class iTermy {
  private scripts: string[] = []

  public newTab = (panes: Pane[], options?: InstanceOptions) => {
    const tabId = this.createNewTab()

    panes.forEach((pane, index) => {
      const commands = pane instanceof Array ? pane[0].commands : pane.commands

      if (index === 0) {
        this.runCommands({
          paneId: this.getPaneId(tabId, 0),
          commands,
        })
      } else {
        this.splitVertically({
          sourceId: this.getPaneId(tabId, index - 1),
          destinationId: this.getPaneId(tabId, index),
        })

        const previous = panes[index - 1]

        if (previous instanceof Array) {
          previous.slice(1).forEach((subPane, subPaneIndex) => {
            const subPaneId = this.getPaneId(tabId, index - 1, subPaneIndex)

            this.splitHorizontally({
              sourceId: this.getPaneId(tabId, index - 1),
              destinationId: subPaneId,
            })

            this.runCommands({
              paneId: subPaneId,
              commands: subPane.commands,
            })
          })
        }

        this.runCommands({
          paneId: this.getPaneId(tabId, index),
          commands,
        })
      }
    })

    return this
  }

  public start = async () => {
    await execa.command(
      `osascript -e '
        tell application "iTerm2"
          tell current window
            ${this.scripts.join('\n\n')}
          end tell
        end tell'`,
      { shell: true },
    )
  }

  private getPaneId = (tabId: string, paneId: number, subPaneId?: number) => {
    return [tabId, paneId, subPaneId].join('_')
  }

  private createNewTab = () => {
    const tabId = `tab_${Date.now()}`

    this.scripts.push(`
      create tab with profile "${ITERM_PROFILE}"
      set ${this.getPaneId(tabId, 0)} to current session
    `)

    return tabId
  }

  private splitVertically = (params: SplitParams) => {
    const { sourceId, destinationId } = params

    this.scripts.push(`
      tell ${sourceId}
        set ${destinationId} to split vertically with profile "${ITERM_PROFILE}"
      end tell
    `)
  }

  private splitHorizontally = (params: SplitParams) => {
    const { sourceId, destinationId } = params

    this.scripts.push(`
      tell ${sourceId}
        set ${destinationId} to split horizontally with profile "${ITERM_PROFILE}"
      end tell
    `)
  }

  private runCommands = (params: RunCommandsParams) => {
    const { paneId, commands } = params

    const scripts = []
      .concat(commands)
      .map((command) => `write text "${command}"`)
      .join('\n')

    this.scripts.push(`
      tell ${paneId}
        ${scripts}
      end tell
    `)
  }
}

export = () => new iTermy()
