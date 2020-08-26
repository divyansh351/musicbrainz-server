/*
 * @flow strict-local
 * Copyright (C) 2020 Anirudh Jain
 *
 * This file is part of MusicBrainz, the open internet music database,
 * and is licensed under the GPL version 2, or (at your option) any
 * later version: http://www.gnu.org/licenses/gpl-2.0.txt
 */

import * as React from 'react';

import EntityLink from '../../static/scripts/common/components/EntityLink';
import Diff from '../../static/scripts/edit/components/edit/Diff';
import FullChangeDiff from
  '../../static/scripts/edit/components/edit/FullChangeDiff';
import formatDate from '../../static/scripts/common/utility/formatDate';
import yesNo from '../../static/scripts/common/utility/yesNo';
import DescriptiveLink from
  '../../static/scripts/common/components/DescriptiveLink';
import {commaOnlyListText} from
  '../../static/scripts/common/i18n/commaOnlyList';

type EditLabelEditT = {
  +display_data: {
    +area?: CompT<AreaT | null>,
    +begin_date?: CompT<PartialDateT>,
    +comment?: CompT<string | null>,
    +end_date?: CompT<PartialDateT>,
    +ended?: CompT<boolean>,
    +ipi_codes?: CompT<$ReadOnlyArray<string> | null>,
    +isni_codes?: CompT<$ReadOnlyArray<string> | null>,
    +label: LabelT,
    +label_code?: CompT<number>,
    +name?: CompT<string>,
    +sort_name?: CompT<string>,
    +type?: CompT<LabelTypeT | null>,
  },
};

type Props = {
  +edit: EditLabelEditT,
};

const EditLabel = ({edit}: Props): React.Element<'table'> => {
  const display = edit.display_data;
  const name = display.name;
  const sortName = display.sort_name;
  const comment = display.comment;
  const area = display.area;
  const type = display.type;
  const labelCode = display.label_code;
  const beginDate = display.begin_date;
  const endDate = display.end_date;
  const ended = display.ended;
  const ipiCodes = display.ipi_codes;
  const isniCodes = display.isni_codes;
  return (
    <table className="details edit-label">
      <tbody>
        <tr>
          <th>{addColonText(l('Label'))}</th>
          <td colSpan="2"><EntityLink entity={display.label} /></td>
        </tr>

        {name ? (
          <Diff
            label={addColonText(l('Name'))}
            newText={name.new}
            oldText={name.old}
            split="\s+"
          />
        ) : null}

        {sortName ? (
          <Diff
            label={addColonText(l('Sort name'))}
            newText={sortName.new}
            oldText={sortName.old}
          />
        ) : null}

        {comment ? (
          <Diff
            label={addColonText(l('Disambiguation'))}
            newText={comment.new ?? ''}
            oldText={comment.old ?? ''}
            split="\s+"
          />
        ) : null}

        {type ? (
          <FullChangeDiff
            label={addColonText(l('Type'))}
            newContent={type.new
              ? lp_attributes(type.new.name, 'label_type')
              : null}
            oldContent={type.old
              ? lp_attributes(type.old.name, 'label_type')
              : null}
          />
        ) : null}

        {labelCode ? (
          <Diff
            label={addColonText(l('Label code'))}
            newText={labelCode.new?.toString() ?? ''}
            oldText={labelCode.old?.toString() ?? ''}
          />
        ) : null}

        {beginDate ? (
          <Diff
            label={addColonText(l('Begin date'))}
            newText={formatDate(beginDate.new)}
            oldText={formatDate(beginDate.old)}
            split="-"
          />
        ) : null}

        {endDate ? (
          <Diff
            label={addColonText(l('End date'))}
            newText={formatDate(endDate.new)}
            oldText={formatDate(endDate.old)}
            split="-"
          />
        ) : null}

        {ended ? (
          <FullChangeDiff
            label={addColonText(l('Ended'))}
            newContent={yesNo(ended.new)}
            oldContent={yesNo(ended.old)}
          />
        ) : null}

        {area ? (
          <FullChangeDiff
            label={addColonText(l('Area'))}
            newContent={area.new
              ? <DescriptiveLink entity={area.new} />
              : null}
            oldContent={area.old
              ? <DescriptiveLink entity={area.old} />
              : null}
          />
        ) : null}

        {ipiCodes ? (
          <Diff
            label={addColonText(l('IPI codes'))}
            newText={ipiCodes.new ? commaOnlyListText(ipiCodes.new) : ''}
            oldText={ipiCodes.old ? commaOnlyListText(ipiCodes.old) : ''}
            split=", "
          />
        ) : null}

        {isniCodes ? (
          <Diff
            label={addColonText(l('ISNI codes'))}
            newText={isniCodes.new ? commaOnlyListText(isniCodes.new) : ''}
            oldText={isniCodes.old ? commaOnlyListText(isniCodes.old) : ''}
            split=", "
          />
        ) : null}
      </tbody>
    </table>
  );
};

export default EditLabel;
