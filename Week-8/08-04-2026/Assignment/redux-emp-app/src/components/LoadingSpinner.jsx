import { useAppSelector } from '../hooks/redux';
import { selectLoading } from '../store/slices/uiSlice';

export default function LoadingSpinner() {
  const loading = useAppSelector(selectLoading);
  if (!loading) return null;
  return (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  );
}
