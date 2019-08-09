import './polyfills';
import {requireCommonDomainModules} from '../common/domain';
import {requireBrowserDomainModules} from './domain';

requireCommonDomainModules();
requireBrowserDomainModules();