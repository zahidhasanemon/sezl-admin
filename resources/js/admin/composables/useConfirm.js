import Swal from 'sweetalert2';

export function useConfirm() {
  // Delete confirmation
  const confirmDelete = async (title = 'Are you sure?', text = "You won't be able to revert this!") => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#999',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    return result.isConfirmed;
  };

  // General confirmation
  const confirm = async (title = 'Are you sure?', text = '', confirmText = 'Yes') => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#999',
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    return result.isConfirmed;
  };

  // Success message (after successful action)
  const success = (title = 'Success!', text = '') => {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      // timer: 2000,
      showConfirmButton: true,
    });
  };

  // Error message
  const error = (title = 'Error!', text = 'Something went wrong!') => {
    return Swal.fire({
      icon: 'error',
      title,
      text,
    });
  };

  return {
    confirmDelete,
    confirm,
    success,
    error,
  };
}
