import Button from 'components/Button/Button';
import ChevronLeft from 'components/Icon/assets/ChevronLeft';
import ChevronRight from 'components/Icon/assets/ChevronRight';
import { CustomToolbarProps } from '../types';

export const CustomToolbar: React.FC<CustomToolbarProps> = ({
  label,
  onNavigate,
  views,
  view,
  onView,
}: CustomToolbarProps) => {
  const newViews = views.slice(0, -1).reverse();

  const customViewTitles = ['Day', 'Week', 'Month',];

  return (
    <>
      <div className="rbc-toolbar ">
        <div className="rbc-btn-group view-group flex items-center view-switch-btn-wrap">
          {newViews.map((viewData, index) => {
            return (
              <Button
                key={viewData}
                className={`rbc-btn ${view === viewData ? 'rbc-active' : ''}`}
                onClickHandler={() => onView(viewData)}
              >
                {customViewTitles[index]}
              </Button>
            );
          })}
        </div>
        <div className="rbc-nav-buttons">
          <button className="prev group" onClick={() => onNavigate('PREV')}>
            <ChevronLeft className="w-5 h-full stroke-2" />
          </button>
        </div>
        <span className="rbc-toolbar-label ">{label}</span>
        <button className="next group" onClick={() => onNavigate('NEXT')}>
          <ChevronRight className="w-5 h-full stroke-2" />
        </button>
        <div className="flex flex-wrap gap-2 ms-auto">
          <div className="rbc-today-button">
            <Button
              variants="PrimaryWoodBorder"
              className="today"
              onClickHandler={() => onNavigate('TODAY')}
            >
              Today
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
