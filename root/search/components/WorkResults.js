/*
 * @flow strict-local
 * Copyright (C) 2018 MetaBrainz Foundation
 *
 * This file is part of MusicBrainz, the open internet music database,
 * and is licensed under the GPL version 2, or (at your option) any
 * later version: http://www.gnu.org/licenses/gpl-2.0.txt
 */

import * as React from 'react';

import WorkListEntry
  from '../../static/scripts/common/components/WorkListEntry';
import type {ResultsPropsWithContextT} from '../types';

import PaginatedSearchResults from './PaginatedSearchResults';
import ResultsLayout from './ResultsLayout';

function buildResult($c, result, index) {
  const work = result.entity;
  const score = result.score;

  return (
    <WorkListEntry
      $c={$c}
      index={index}
      key={work.id}
      score={score}
      showIswcs
      work={work}
    />
  );
}

const WorkResults = ({
  $c,
  form,
  lastUpdated,
  pager,
  query,
  results,
}: ResultsPropsWithContextT<WorkT>):
React.Element<typeof ResultsLayout> => (
  <ResultsLayout $c={$c} form={form} lastUpdated={lastUpdated}>
    <PaginatedSearchResults
      buildResult={(result, index) => buildResult($c, result, index)}
      columns={
        <>
          <th>{l('Name')}</th>
          <th>{l('Writers')}</th>
          <th>{l('Artists')}</th>
          <th>{l('ISWC')}</th>
          <th>{l('Type')}</th>
          <th>{l('Lyrics Languages')}</th>
        </>
      }
      pager={pager}
      query={query}
      results={results}
    />
    {$c.user && !$c.user.is_editing_disabled ? (
      <p>
        {exp.l('Alternatively, you may {uri|add a new work}.', {
          uri: '/work/create?edit-work.name=' + encodeURIComponent(query),
        })}
      </p>
    ) : null}
  </ResultsLayout>
);

export default WorkResults;
