import Table from '../../components/Table';
import { useGetWineData } from '../../hooks';
import { getMean, getMedian, getMode } from '../../utils';

/**
 * @description Flavonoid property based stats table
 */
const FlavonoidTable = () => {
  const { formattedWineData } = useGetWineData();
  const { meanClass1, meanClass2, meanClass3 } = getMean(
    formattedWineData,
    'typeA'
  );
  const { medianClass1, medianClass2, medianClass3 } = getMedian(
    formattedWineData,
    'typeA'
  );
  const { modeClass1, modeClass2, modeClass3 } = getMode(
    formattedWineData,
    'typeA'
  );

  return (
    <Table
      tableData={{
        caption: 'Flavanoids Stats',
        head: ['Measure', 'Class 1', 'Class 2', 'Class 3'],
        body: [
          ['Flavonoids Mean', meanClass1, meanClass2, meanClass3],
          ['Flavonoids Median', medianClass1, medianClass2, medianClass3],
          ['Flavonoids Mode', modeClass1, modeClass2, modeClass3],
        ],
      }}
    />
  );
};

export default FlavonoidTable;
