import { Button } from '@nextui-org/react';

const Pagination = ({ isNext, onNext, onPrev, isPrev }) => {
  return (
    <div className="flex gap-4 mt-8">
      {isPrev && (
        <Button onClick={onPrev} size="sm">
          {'<'}
        </Button>
      )}
      {isNext && (
        <Button onClick={onNext} size="sm">
          {'>'}
        </Button>
      )}
    </div>
  );
};

export default Pagination;
