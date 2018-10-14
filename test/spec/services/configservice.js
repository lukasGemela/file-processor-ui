'use strict';

describe('Service: ConfigService', function () {

  // load the service's module
  beforeEach(module('deimosApp'));

  // instantiate service
  var ConfigService;
  var httpMock;
  var isError;

  var testURL = 'ws://test101';
  beforeEach(function () {
    isError = false;

    httpMock = {
      get: function () {
        return {
          then: function (onSuccess, onError) {
            if (!isError) {
              onSuccess({
                data: {
                  'catalogueUrl': testURL
                }
              });
            } else {
              onError('Failed');
            }
          }
        };
      }
    };

    module(function ($provide) {
      $provide.value('$http', httpMock);
    });

    inject(function (_ConfigService_) {
      ConfigService = _ConfigService_;
    });
  });

  var $rootScope;
  beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_;
  }));

  it('Should initialise', function () {
    expect(!!ConfigService).toBe(true);
  });

  it('Should get config via http', function (done) {
    ConfigService.getConfig().then(
      function (data) {

        expect(data).toEqual({
          'catalogueUrl': testURL
        });
        done();
      }, function (err) {
        done(err);
      }
    );

    $rootScope.$apply(); //TO kick-off promise
  });

  it('Should call error function if erroed', function (done) {
    isError = true;
    ConfigService.getConfig().then(
      function () { done('Failed!'); },
      function (err) {
        expect(err).toEqual('Config Request Failed');
        done();
      }
    );
    $rootScope.$apply();
  });

});
