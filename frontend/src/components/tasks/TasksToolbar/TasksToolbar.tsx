import { useTranslation } from 'react-i18next';
import { Button } from '@/components/common';

interface TasksToolbarProps {
  totalCount: number;
  onAddTask: () => void;
}

export function TasksToolbar({ totalCount, onAddTask }: TasksToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-primary">
        {t('tasks.title').toLowerCase()} : {totalCount} 
      </h2>
      <Button onClick={onAddTask}>
        + {t('tasks.addTask')}
      </Button>
    </div>
  );
}
