import Swal, { SweetAlertIcon } from 'sweetalert2';

export const alert = (title: string, text: string, icon: SweetAlertIcon) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK',
  });
};
