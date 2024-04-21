import Table from '../../components/Table';
import { useGetWineData } from '../../hooks';
import { getMean, getMedian, getMode } from '../../utils';

/**
 * @description Gamma property based stats table
 */
const GammaTable = () => {
  const { formattedWineData } = useGetWineData();
  const { meanClass1, meanClass2, meanClass3 } = getMean(
    formattedWineData,
    'typeB'
  );
  const { medianClass1, medianClass2, medianClass3 } = getMedian(
    formattedWineData,
    'typeB'
  );
  const { modeClass1, modeClass2, modeClass3 } = getMode(
    formattedWineData,
    'typeB'
  );

  return (
    <Table
      tableData={{
        caption: 'Gamma Stats',
        head: ['Measure', 'Class 1', 'Class 2', 'Class 3'],
        body: [
          ['Gamma Mean', meanClass1, meanClass2, meanClass3],
          ['Gamma Median', medianClass1, medianClass2, medianClass3],
          ['Gamma Mode', modeClass1, modeClass2, modeClass3],
        ],
      }}
    />
  );
};

export default GammaTable;
