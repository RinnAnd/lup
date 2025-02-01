import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/failure.css';
import 'react-simple-toasts/dist/theme/success.css';
import 'react-simple-toasts/dist/theme/info.css';

toastConfig({
  duration: 5000,
  position: 'bottom-right',
  maxVisibleToasts: 3,
});

const showToast = (message: string, theme: 'failure' | 'success' | 'info') => {
  toast(message, {
    theme,
  });
};

export default showToast;
