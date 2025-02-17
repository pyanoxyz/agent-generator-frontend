interface EmptyStateProps {
  label: string;
}

export const EmptyState = ({ label }: EmptyStateProps) => (
  <div className="text-center py-6 border border-dashed border-gray-800 rounded-lg">
    <p className="text-gray-500 text-sm">
      No {label.toLowerCase()} items yet. Click below to add one.
    </p>
  </div>
);
