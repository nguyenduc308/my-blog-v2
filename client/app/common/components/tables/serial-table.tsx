import { Serial } from 'interfaces/serialModal';
import {SerialTableWrapperUi} from './serial-table.styled';

interface SerialTableProps {
  data: Serial
}

const SerialTable: React.FC<SerialTableProps> = ({data}) => {
  return <SerialTableWrapperUi>
    <div className="header">
      {data.title}
    </div>
    <div className="body">

    </div>
  </SerialTableWrapperUi>
}

export default SerialTable;
