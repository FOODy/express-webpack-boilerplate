import './polyfills';
import {requireCommonDomainModules} from '../common/domain';
import {requireServerDomainModules} from './domain';
import requireGraphqlSchemaFiles from './lib/graphql/require-graphql-schema-files';

requireGraphqlSchemaFiles();
requireCommonDomainModules();
requireServerDomainModules();