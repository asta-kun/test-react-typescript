import { IEmployee, IEmployeesResponseData } from './types.d';
import { api } from '../../BaseAPI';
import { IAPIStandardResponse } from '../../../../../types/API.d';
import {
  IIndexedAPIEntity,
  prettyAPIList,
} from '../../utils/api-list-transform';
import { APIResource, APIResourceType } from '../../types.d';

export const employeesAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<
      Readonly<IIndexedAPIEntity<IEmployee, number>>,
      unknown
    >({
      query: () => {
        return {
          url: '/v1/examen/employees/:hector_castillo',
        };
      },
      transformResponse: (
        baseQueryReturnValue
      ): IIndexedAPIEntity<IEmployee, number> => {
        const response =
          baseQueryReturnValue as IAPIStandardResponse<IEmployeesResponseData>;

        const data = prettyAPIList<IEmployee, number>(response.data.employees, {
          key: 'id',
        });

        return data;
      },

      providesTags: (result) => [
        { type: APIResourceType.employees, id: APIResource.list },
      ],
      keepUnusedDataFor: 60 * 15, // minutes
    }),
  }),
});

export const { useGetEventsQuery, useLazyGetEventsQuery } = employeesAPI;
