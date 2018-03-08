import swal from 'sweetalert2'
import i18n from '@/utils/i18n'

const successMessage = (title, timer = null) => swal({title: i18n(title), type: 'success', timer})
const errorMessage = (title, timer = null) => swal({title: i18n(title), type: 'error', timer})

export {
  successMessage,
  errorMessage
}
