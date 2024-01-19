CREATE TABLE IF NOT EXISTS public.prices
(
    id            serial           primary key,
    price     double precision not null,
    created_date  timestamp        not null,
    listing_id    integer          not null,
    foreign key (listing_id) references public.listing (id)
);

