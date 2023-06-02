import fetcher from 'utils/fetcher';

export async function create(invoice) {
  return fetcher([
    '/invoice',
    {
      method: 'post',
      data: invoice
    }
  ]);
}

export async function update(id, updates) {
  return fetcher([
    `/invoice/${id}`,
    {
      method: 'patch',
      data: updates
    }
  ]);
}

export async function share(id, ids, view, edit) {
  return fetcher([
    `/invoice/permissions/${id}`,
    {
      method: 'post',
      data: { ids, view, edit }
    }
  ]);
}

export async function send(id, recipients) {
  return fetcher([
    `/invoice/send/${id}`,
    {
      method: 'post',
      data: { recipients }
    }
  ]);
}
