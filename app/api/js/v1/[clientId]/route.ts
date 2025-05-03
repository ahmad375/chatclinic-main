export const dynamic = 'force-dynamic'
export const runtime = 'edge'

// from js/v1.js
const v1 = `
const CLIENT_ID = '{{CLIENT_ID}}'
const WIDGET_ID = 'chatwizard-widget'
const FRAME_ID = 'chatwizard-iframe'
const SCRIPT_SENDER = 'CHATCLINIC_SCRIPT'
const WIDGET_SENDER = 'CHATCLINIC_WIDGET'
const FRAME_SENDER = 'CHATCLINIC_FRAME'
const BASE_URL = '{{BASE_URL}}'
const MAX_Z_INDEX = 2147483647
const SENDERS = [WIDGET_SENDER, FRAME_SENDER]
const ANIMATION_OFFSET = '10px'
const THREAD_ID_KEY = 'chatwizardThreadId'

const getWidget = () => document.getElementById(WIDGET_ID)
const getFrame = () => document.getElementById(FRAME_ID)

const mount = () => {
  var threadId = localStorage.getItem(THREAD_ID_KEY)

  if (!threadId) {
    threadId = crypto.randomUUID()
    localStorage.setItem(THREAD_ID_KEY, threadId)
  }

  if (!getWidget()) {
    const widget = document.createElement('iframe')

    const widgetOffset = '24px'
    const widgetSize = '56px'

    widget.allowTransparency = true

    widget.style.setProperty('border-width', '0px', 'important')
    widget.style.setProperty('width', widgetSize, 'important')
    widget.style.setProperty('height', widgetSize, 'important')
    widget.style.setProperty('position', 'fixed', 'important')
    widget.style.setProperty('right', widgetOffset, 'important')
    widget.style.setProperty('bottom', widgetOffset, 'important')
    widget.style.setProperty('border-radius', '999px', 'important')
    widget.style.setProperty('z-index', MAX_Z_INDEX.toString(), 'important')
    widget.style.setProperty('overflow', 'hidden', 'important')
    widget.style.setProperty('background-color', 'transparent', 'important')
    widget.style.setProperty('user-select', 'none', 'important')

    widget.id = WIDGET_ID
    widget.src = BASE_URL + '/client/' + CLIENT_ID + '/' + threadId + '/widget'

    document.body.appendChild(widget)
  }

  if (!getFrame()) {
    const frame = document.createElement('iframe')

    const frameWidth = '400px'
    const frameHeight = '600px'
    const frameOffsetX = '24px'
    const frameOffsetY = '96px'

    frame.allowFullscreen = true
    frame.allowTransparency = true
    frame.ariaHidden = true

    /*
      Non-responsive styles
    */
    frame.style.setProperty('display', 'none', 'important')
    frame.style.setProperty('visibility', 'hidden', 'important')
    frame.style.setProperty('opacity', '0', 'important')
    frame.style.setProperty('pointer-events', 'none', 'important')
    frame.style.setProperty('user-select', 'none', 'important')
    frame.style.setProperty('position', 'fixed', 'important')
    frame.style.setProperty('z-index', MAX_Z_INDEX.toString(), 'important')
    frame.style.setProperty('overflow', 'hidden', 'important')
    frame.style.setProperty(
      'box-shadow',
      'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      'important'
    )
    frame.style.setProperty('max-height', '-moz-available', 'important')
    frame.style.setProperty('max-height', '-webkit-fill-available', 'important')
    frame.style.setProperty('max-height', 'fill-available', 'important')

    frame.id = FRAME_ID
    frame.src = BASE_URL + '/client/' + CLIENT_ID + '/' + threadId + '/frame'

    const applyResponsiveStyles = () => {
      const isNarrowScreen = widthQuery.matches
      const isShortScreen = heightQuery.matches

      if (isNarrowScreen) {
        frame.style.setProperty('width', '100vw', 'important')
        frame.style.setProperty('height', '100vh', 'important')
        frame.style.setProperty('right', '0px', 'important')
        frame.style.setProperty('bottom', '0px', 'important')
        frame.style.setProperty('border-radius', '0px', 'important')
        frame.style.setProperty('border', '0px', 'important')
      } else if (isShortScreen) {
        frame.style.setProperty('width', frameWidth, 'important')
        frame.style.setProperty('height', '100vh', 'important')
        frame.style.setProperty('right', '0px', 'important')
        frame.style.setProperty('bottom', '0px', 'important')
        frame.style.setProperty('border-radius', '0px', 'important')
        frame.style.setProperty('border', '0px', 'important')
      } else {
        frame.style.setProperty('width', frameWidth, 'important')
        frame.style.setProperty('height', frameHeight, 'important')
        frame.style.setProperty('right', frameOffsetX, 'important')
        frame.style.setProperty('bottom', frameOffsetY, 'important')
        frame.style.setProperty('border-radius', '14px', 'important')
        frame.style.setProperty('border', '0px', 'important')
      }
    }

    const widthQuery = window.matchMedia('(max-width: 550px)')
    const heightQuery = window.matchMedia('(max-height: 600px)')

    widthQuery.addEventListener('change', applyResponsiveStyles)
    heightQuery.addEventListener('change', applyResponsiveStyles)

    applyResponsiveStyles()

    document.body.appendChild(frame)
  }
}

const onMessage = (event) => {
  if (
    event &&
    event.data &&
    event.data.sender &&
    SENDERS.includes(event.data.sender)
  ) {
    const widget = getWidget()
    const frame = getFrame()

    const showFrame = () => {
      const frame = getFrame()
      if (frame) {
        frame.ariaHidden = false
        frame.style.setProperty('display', 'block', 'important')
        frame.style.setProperty('visibility', 'visible', 'important')
        frame.style.setProperty('opacity', '1', 'important')
        frame.style.setProperty('pointer-events', 'all', 'important')
        frame.style.setProperty('user-select', 'auto', 'important')
      }
    }

    const hideFrame = () => {
      if (frame) {
        frame.ariaHidden = true
        frame.style.setProperty('display', 'none', 'important')
        frame.style.setProperty('visibility', 'hidden', 'important')
        frame.style.setProperty('opacity', '0', 'important')
        frame.style.setProperty('pointer-events', 'none', 'important')
        frame.style.setProperty('user-select', 'none', 'important')
      }
    }

    const data = event.data
    const { sender, type, payload } = data

    switch (type) {
      case 'SET_ACTIVE':
        if (payload) {
          showFrame()
        } else {
          hideFrame()
        }

        if (sender === WIDGET_SENDER && frame) {
          frame.contentWindow.postMessage({
            sender: SCRIPT_SENDER,
            type: 'SET_ACTIVE',
            payload
          },'*')
        } else if (sender === FRAME_SENDER && widget) {
          widget.contentWindow.postMessage({
            sender: SCRIPT_SENDER,
            type: 'SET_ACTIVE',
            payload
          },'*')
        }
        break
      default:
        break
    }
  }
}

if (document.readyState === 'complete') {
  mount()
} else {
  window.addEventListener('load', mount)
}

window.addEventListener('message', onMessage)
`

export async function GET(
  _: Request,
  { params: { clientId } }: { params: { clientId: string } }
) {
  try {
    const js = v1
      .replace('{{CLIENT_ID}}', clientId)
      .replace('{{BASE_URL}}', process.env.NEXT_PUBLIC_APP_URI!)
    return new Response(js, {
      headers: {
        'Content-Type': 'text/javascript'
      },
      status: 200
    })
  } catch (e) {
    console.log(`/api/js/v1/[clientId] error: ${e}`)
    return new Response('console.error("Could not load Chat Clinic script")', {
      headers: {
        'Content-Type': 'text/javascript'
      },
      status: 200
    })
  }
}
