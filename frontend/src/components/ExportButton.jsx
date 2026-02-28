import { getExportUrl } from '../services/api';

const ExportButton = ({ hasNotes }) => {
    return (
        <a
            href={getExportUrl()}
            download
            className={`inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-lg font-medium text-white transition-colors
                ${hasNotes
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-sm cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed opacity-60 pointer-events-none'
                }`}
            onClick={(e) => {
                if (!hasNotes) e.preventDefault();
            }}
        >
            Export All (.txt)
        </a>
    );
};

export default ExportButton;
