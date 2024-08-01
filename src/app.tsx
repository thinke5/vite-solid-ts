import './app.less'
import 'uno.css'
import { BUILD_TIME, BUILD_V } from './config'

// spa or apa
import './layout/SPA'
// import './layout/APA'

// eslint-disable-next-line no-console
console.log(`%c ${BUILD_V} bulid in ${BUILD_TIME} `, 'background:#4a0;color:#fff;padding:6px;')
