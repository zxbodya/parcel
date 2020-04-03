// @flow
import type WorkerFarm from "@parcel/workers";
import {createWorkerFarm} from '@parcel/core';

export default (createWorkerFarm(): WorkerFarm);
